# Comments and site access — setup

Two independent features, both added in this pass:

1. **Comments** — a giscus-backed discussion thread on every entry page and Open Questions,
   using GitHub Discussions as storage. Commenting requires a GitHub account.
2. **Site access gate** — the whole site sits behind a shared passphrase before it goes out to
   250+ people, since it now accepts written comments and holds internal PRD/BOM/DFMEA content.

Neither works under plain `npm run dev` for the gate (Vite alone doesn't run Vercel Edge
Middleware or `/api` functions) — use `vercel dev` locally, or test on a Vercel preview deploy.
Comments work under `npm run dev` once the `VITE_GISCUS_*` variables are set, since giscus is
just a client-side script.

## 1. Comments (giscus)

Steps 1–3 require your own GitHub authorization — connecting the giscus GitHub App to a
repository is an OAuth-style grant, and that has to come from you, not from an agent.

1. **Enable Discussions on the repo.** Run:

   ```bash
   gh api -X PATCH repos/annuai/ati-docs -f has_discussions=true
   ```

2. **Use the existing "Announcements" category** — no need to create one. GitHub repos come
   with a fixed set of categories (Announcements, General, Ideas, Polls, Q&A, Show and tell) and
   don't offer a way to add a custom-named one. `Announcements` already has the access shape
   giscus needs: only maintainers can start a new top-level discussion, but anyone with read
   access can reply — which matters because giscus creates one discussion per page automatically,
   and visitors shouldn't be able to create arbitrary unrelated discussions.

3. **Connect giscus.** Go to [giscus.app](https://giscus.app), enter `annuai/ati-docs`, follow
   its prompt to install the giscus app on the repo (this is the GitHub OAuth grant — you do this
   step, in your own browser). Once connected, giscus.app shows a config panel — set:
   - **Page ↔ Discussions Mapping**: `pathname`
   - **Discussion Category**: `Announcements`

   The panel then shows the exact `data-repo-id` and `data-category-id` values (for this repo,
   these are `R_kgDOUdUUiQ` and `DIC_kwDOUdUUic4DF2v3` — already written into `.env.local`).

4. **Set the environment variables** (Vercel project settings → Environment Variables, and
   locally in `.env.local` — see `.env.example`):

   ```
   VITE_GISCUS_REPO=annuai/ati-docs
   VITE_GISCUS_REPO_ID=R_kgDOUdUUiQ
   VITE_GISCUS_CATEGORY=Announcements
   VITE_GISCUS_CATEGORY_ID=DIC_kwDOUdUUic4DF2v3
   ```

5. Redeploy. The `Comments` component ([src/components/content/Comments.jsx](../src/components/content/Comments.jsx))
   renders nothing until all four variables are present, so there's no broken half-state in the
   meantime.

## 2. Site access gate

No third-party authorization here — just two secrets you generate yourself.

1. **Pick a passphrase.** This is what all 250+ people will type in — shared, not personal.
2. **Generate a signing secret** — any long random string, e.g.:

   ```bash
   openssl rand -hex 32
   ```

3. **Set both as environment variables** in the Vercel project (Settings → Environment
   Variables — these have no `VITE_` prefix, so they stay server-only and are never shipped to
   the browser):

   ```
   SITE_PASSWORD=<the passphrase>
   SITE_ACCESS_SECRET=<the random string from step 2>
   ```

4. Redeploy. [middleware.js](../middleware.js) runs on every request except `/login.html` and
   `/api/login`, checks for a valid signed cookie, and redirects to the passphrase page if it's
   missing. [api/login.js](../api/login.js) checks the submitted passphrase and, on success, sets
   a cookie signed with `SITE_ACCESS_SECRET`, valid for 30 days.

   If `SITE_ACCESS_SECRET` is unset, the site fails **closed** (a clear 500, not a silently open
   site) — see the comment in `middleware.js`.

5. **Distribute** the URL and the passphrase separately (e.g. the link in an email, the
   passphrase over Slack/in person) — sending both together in the same message defeats the
   point.

### Rotating or revoking access

There's no per-person login, so there's no way to revoke one person without revoking everyone.
Changing `SITE_PASSWORD` and redeploying invalidates the passphrase for new logins, but anyone
who already has a valid cookie stays in for up to 30 days until it expires — `SITE_ACCESS_SECRET`
would need to change too to invalidate existing sessions immediately.

If per-person revocation ever matters, that's a sign this gate has outgrown a shared passphrase
and should move to something with real per-person identity (e.g. requiring a GitHub account and
checking org membership, the same account model comments already use).
