/* eslint-disable @typescript-eslint/no-explicit-any, import/no-unresolved */
// @ts-ignore – types bundled but eslint import resolver complains in mono repo env
import puppeteer from 'puppeteer';
import axios from 'axios';

/**
 * Logs into YouTube with the provided Google credentials (taken from process.env)
 * and returns a serialized cookie header string ("name=value; name2=value2; ...")
 * for domains that include "youtube.com".
 */
async function getCookieString(): Promise<string> {
  const { YT_GOOGLE_EMAIL, YT_GOOGLE_PASSWORD } = process.env as Record<string, string>;
  if (!YT_GOOGLE_EMAIL || !YT_GOOGLE_PASSWORD) {
    throw new Error('Missing YT_GOOGLE_EMAIL or YT_GOOGLE_PASSWORD env variables');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Navigate to Google sign-in (YouTube service scopes).
    await page.goto('https://accounts.google.com/ServiceLogin?service=youtube&hl=en', {
      waitUntil: 'networkidle2',
    });

    // Email.
    await page.type('input[type=email]', YT_GOOGLE_EMAIL, { delay: 40 });
    await page.click('#identifierNext');

    await page.waitForSelector('input[type=password]', { visible: true });
    await page.type('input[type=password]', YT_GOOGLE_PASSWORD, { delay: 40 });
    await page.click('#passwordNext');

    // When the login succeeds Google may redirect a few times; wait until YouTube loads.
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Go to YouTube explicitly to make sure cookies are set for that domain.
    await page.goto('https://www.youtube.com', { waitUntil: 'networkidle2' });

    const cookies = await page.cookies();
    // Build serialized cookie string limited to youtube.com cookies.
    const cookieHeader = cookies
      .filter((c: any) => c.domain.includes('youtube.com'))
      .map((c: any) => `${c.name}=${c.value}`)
      .join('; ');

    if (!cookieHeader) {
      throw new Error('Failed to extract YouTube cookies');
    }

    return cookieHeader;
  } finally {
    await browser.close();
  }
}

/**
 * Updates (or creates) the YT_COOKIE environment variable in Vercel and triggers
 * a fresh deployment so the new env value is loaded by Edge/Serverless Functions.
 */
async function updateVercelEnv(cookie: string) {
  const { VERCEL_TOKEN, VERCEL_PROJECT_ID } = process.env as Record<string, string>;
  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    throw new Error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID env variables');
  }

  const api = axios.create({
    baseURL: 'https://api.vercel.com',
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  });

  // Fetch existing env vars to see if YT_COOKIE exists.
  const { data: envData } = await api.get(`/v10/projects/${VERCEL_PROJECT_ID}/env`);
  const existing = envData.envs.find((e: any) => e.key === 'YT_COOKIE');

  if (existing) {
    // Update value.
    await api.patch(`/v10/projects/${VERCEL_PROJECT_ID}/env/${existing.id}`, {
      value: cookie,
      target: existing.target,
    });
  } else {
    // Create new variable (production-only).
    await api.post(`/v10/projects/${VERCEL_PROJECT_ID}/env`, {
      key: 'YT_COOKIE',
      value: cookie,
      target: ['production'],
      type: 'plain',
    });
  }

  // Kick off a redeploy so that Edge/Serverless functions pick up the new value.
  await api.post('/v13/deployments', {
    projectId: VERCEL_PROJECT_ID,
    name: 'yt-cookie-rotation',
  });
}

(async () => {
  try {
    const cookie = await getCookieString();
    await updateVercelEnv(cookie);
    console.log('YT_COOKIE successfully refreshed and Vercel redeploy triggered');
  } catch (err) {
    console.error('Cookie rotation failed:', err);
    process.exit(1);
  }
})(); 