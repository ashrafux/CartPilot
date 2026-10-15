# CartPilot website (Astro)

Marketing site for **cartpilot.ai**, built with [Astro](https://astro.build). It produces a fully static site: plain HTML/CSS/JS in `dist/`, with no server code. It is a 1:1 move of the hand-built static site. Every page was checked against the original (same DOM, same screenshots at 1440px and 390px).

## Run it

```bash
npm install          # once
npm run dev          # http://localhost:4321, live reload while you edit
npm run build        # static site → dist/
npm run preview      # serve dist/ locally to check the build
```

Node 22.12 or newer is required.

## Where things live

| What | Where |
| --- | --- |
| Pages (URL = file name) | `src/pages/*.astro` (`pricing.astro` → `/pricing/`) |
| WooCommerce + Shopify pages | **one** template, `src/pages/[platform].astro`. Copy is in `src/data/platforms.ts`; the UI mock-ups are in `src/lib/platform.ts`. A layout change lands on both pages. |
| `<head>`, header, footer, site.js | `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro` |
| FAQ block (home, features, pricing, affiliate, platforms) | `src/components/Faq.astro`. Each page passes its own `faq` data from the top of the page file. |
| Sky CTA above the footer | `src/components/CtaSky.astro`. Each page passes the title, text and buttons. |
| CSS / JS / images / video | `public/assets/…`, served as-is at `/assets/…` |
| 404, sitemap, robots, redirects | `src/pages/404.astro`, `@astrojs/sitemap` (auto), `public/robots.txt`, `public/_redirects` |

### Common edits

- **Menu or footer links:** edit `Header.astro` or `Footer.astro`. Every page updates. The current page's link is highlighted automatically.
- **A page's FAQ:** edit the `faq.items` list at the top of that page file. The first item opens by default.
- **Platform page copy:** edit `src/data/platforms.ts`. For a section's layout, edit `[platform].astro`.
- **Global styles:** edit `public/assets/css/site.css`, then bump `?v=` in `Base.astro` so browsers fetch the new file. Platform styles are in `public/assets/css/platform.css` (version in `[platform].astro`).
- **New page:** add `src/pages/new-page.astro` using `<Base title description>`. It appears at `/new-page/` and in the sitemap.

---

## Publishing: replacing the current WordPress site

Today `cartpilot.ai` is a WordPress site. This repo replaces its **front-end**: the marketing pages, legal pages, blog listing and docs landing page. All URLs in the live sitemap stay the same:

`/`, `/features/`, `/pricing/`, `/affiliate/`, `/affiliate-terms-and-conditions/`, `/support/`, `/contact/`, `/faq/`, `/docs/`, `/blog/`, `/introducing-cartpilot-ai-sales-agent/`, `/hello-world/`, `/privacy-policy/`, `/terms-of-service/`, `/refund-policy/`

Two pages are new: `/woocommerce/` and `/shopify/`.

### 1. Before go-live (content and integrations)

These are placeholders in the rebuild and must be finished first:

- **Official legal and long-form text.** Pages showing the yellow/blue *"Summary version — replace with the official text…"* note need their real text:
  - privacy, terms, refund and affiliate terms
  - the docs landing page
  - both blog posts

  Remove each note once the official text is in.
- **Forms are front-end only.** None of these currently send anything:
  - contact form (`/contact/`) and support form (`/support/`)
  - newsletter subscribe (footer and `/blog/`)
  - the demo chat panel

  Connect them to the real backend, for example:
  - the existing WordPress form endpoint, FluentCRM or Mailchimp
  - a form service such as Formspree or HubSpot
- **Store links.** The "Get the WordPress Plugin" and "Install on Shopify" buttons point to WordPress.org and Shopify App Store **search** pages. Replace them with the real listing URLs in `src/data/platforms.ts` and on the home and features pages.
- **Docs sub-pages.** `/docs/` links to 19 WordPress docs pages (`/docs/cartpilot/...`). Either keep WordPress serving those (see option B below), or move the docs over too.
- **Tracking and consent.** Copy the analytics, Tag Manager, pixel and cookie-consent snippets from the current WordPress `<head>` into `src/layouts/Base.astro`.
- **Final check.** Run `npm run build`, then `npm run preview`, and click through every page on desktop and mobile.

### 2. Pick how to host it

**A. Static host (simplest).** Cloudflare Pages, Netlify or Vercel. Vercel reads `vercel.json` (Astro preset plus the same redirects as `public/_redirects`). Note that Vercel's free Hobby plan is for non-commercial use only, so a company site needs the Pro plan; Cloudflare Pages' free plan allows commercial use.

1. Push this folder to a company GitHub repo.
2. Create a project on the host and connect the repo. Use build command `npm run build` and output directory `dist`.
3. The host gives you a preview URL. Do the QA there.
4. Add the custom domain `cartpilot.ai` and update DNS when ready.
5. `public/_redirects` handles the old WordPress category and feed URLs.
6. Move WordPress (blog/docs admin) to a subdomain such as `wp.cartpilot.ai` if you still need it. Then update the docs links in `src/pages/docs.astro`.

After this, every `git push` to the main branch rebuilds and publishes the site automatically.

**B. Same server as WordPress (e.g. FlyWP / nginx).** Serve `dist/` as the site root and keep sending WordPress-only paths to WordPress:

```nginx
server {
  server_name cartpilot.ai;
  root /var/www/cartpilot-site/dist;      # upload the contents of dist/ here
  index index.html;

  # WordPress keeps the docs sub-pages, admin, API and its own files
  location ~ ^/(docs/cartpilot/|wp-admin|wp-json|wp-content|wp-includes|wp-login\.php|xmlrpc\.php) {
    proxy_pass http://127.0.0.1:8080;     # the existing WordPress site
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location ^~ /category/ { return 301 /blog/; }
  location = /feed/ { return 301 /blog/; }
  location = /sitemap_index.xml { return 301 /sitemap-index.xml; }

  location / { try_files $uri $uri/ =404; }
  error_page 404 /404.html;
}
```

To deploy an update, run `npm run build` and upload `dist/`. Uploading by rsync or a CI job also works.

**C. Keep WordPress as the front-end.** This means rebuilding the designs as a WordPress theme or blocks. It is not recommended: it is much more work and loses this exact design.

### 3. Go-live day

1. Deploy to staging, do the final QA, then switch DNS (A) or the nginx root (B). Keep the old WordPress untouched so you can switch back if needed.
2. Submit `https://cartpilot.ai/sitemap-index.xml` in Google Search Console.
3. Watch for 404s for a few days. Add any missing old URLs to `public/_redirects` (A) or nginx (B).

### 4. After launch

1. Edit in `src/`.
2. Check with `npm run dev`.
3. Push to GitHub (A) or build and upload (B).
