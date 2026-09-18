import { ACCESS_COOKIE, verifyToken } from './lib/auth.js';

/*
  Gates the whole site behind a shared passphrase — OFF by default.

  The gate is opt-in: it only activates once SITE_ACCESS_SECRET is set as an environment variable
  in the Vercel project. Until then this middleware is a no-op and every request passes through
  untouched, by deliberate choice (2026-09-18) — the site is being distributed without a passphrase
  for now. Set SITE_PASSWORD and SITE_ACCESS_SECRET (see docs/comments-setup.md) and redeploy
  whenever the gate should turn on.

  Once active: runs on Vercel's Edge Runtime for every request except the login page and its own
  API route — including the built JS/CSS bundle itself, not just the rendered page, so an
  unauthenticated visitor can't read the site by requesting assets directly.
*/
export const config = {
  matcher: ['/((?!api/login|login.html|_vercel).*)']
};

export default async function middleware(request) {
  const secret = process.env.SITE_ACCESS_SECRET;
  if (!secret) {
    return; // gate not configured — deliberately open, see comment above
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${ACCESS_COOKIE}=([^;]+)`));
  const token = match ? decodeURIComponent(match[1]) : null;

  if (token && (await verifyToken(token, secret))) {
    return; // authenticated — fall through to the normal static/rewrite handling
  }

  const url = new URL(request.url);
  const loginUrl = new URL('/login.html', url);
  loginUrl.searchParams.set('next', url.pathname + url.search);
  return Response.redirect(loginUrl, 307);
}
