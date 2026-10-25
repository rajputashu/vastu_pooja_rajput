# Pooja Rajput Vastu

A starter website for a Vastu consultation studio and a small crystal shop. It is meant to feel like a quiet architecture practice: ivory pages, forest green text, and photographs of courtyards, linen, and stones.

You can change the name, colours, words, and products without hunting through the whole project. Start with the files named in [Change the brand](#change-the-brand).

## What you are looking at

This project runs as a **React website** using TanStack Start (file-based pages, TypeScript, and Tailwind). That is the same idea as Next.js — pages live in a `routes` folder and the site is one app — and it is the stack this workspace builds and publishes with.

A small **Python API** lives in `backend/`. Phase 1 only answers a health check. The website does not need that Python app to be running. It already has its own health check at `/api/v1/health`.

Nothing here takes payment, stores enquiries, or pretends to be a real inventory.

## Prerequisites

Install these on your computer:

- [Node.js 22](https://nodejs.org/) (the site)
- [Python 3.10 or newer](https://www.python.org/downloads/) (only if you want the separate API)

You do not need a database, a paid key, or a Cashfree account for this phase.

## Project folders

```text
src/                  The website
  routes/             One file per page, plus /api/v1/health
  components/         Header, footer, cart, forms
  data/               Sample services, products, and articles
  lib/                Cart maths, site name, API address
  types/              Shared TypeScript shapes
public/images/        Photographs used on the pages
backend/              Optional FastAPI app
  app/                Python package (health route, settings)
  tests/              Health-check test
docs/                 Notes for the next phase
```

## Run the website

From the project folder:

```bash
npm install
npm run dev
```

Open the site at [http://127.0.0.1:8080](http://127.0.0.1:8080).

Useful checks:

```bash
npm run typecheck
npm test
npm run build
```

Stop the site with `Ctrl+C` in the terminal that is running it. Start it again with `npm run dev`.

## Run the Python API (optional)

Open a second terminal.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

On Windows, activate the virtual environment with `.venv\Scripts\activate` instead of `source`.

Then open:

- API home: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Health: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)
- Interactive docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Run the test (with the virtual environment still active, from `backend/`):

```bash
pytest
```

Stop the API with `Ctrl+C`.

The website checks `/api/v1/health` on the contact page. By default that is **its own** check, not Python. To point the browser at the Python app, start the website with:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000 npm run dev
```

Copy `.env.example` in the project root if you want a reminder of that variable. Do not put secrets in it. This phase has none.

If Python is not running and you set `VITE_API_BASE_URL`, the contact page will say the API is unavailable. The rest of the site still works.

### Python settings

| Variable | Meaning |
| --- | --- |
| `FRONTEND_ORIGIN` | The website address allowed to call the API. Default `http://127.0.0.1:8080`. |
| `APP_ENV` | A label such as `development`. Not used for secrets. |
| `VITE_API_BASE_URL` | Optional website setting. Empty means “use this same site”. |

## Change the brand

| What | Where |
| --- | --- |
| Name, email, phone, city, domain | `src/lib/site.ts` |
| Colours and fonts | `src/styles.css` (`@theme` block) |
| Services | `src/data/services.ts` |
| Crystals | `src/data/products.ts` and files in `public/images/` |
| Journal | `src/data/journal.ts` |
| Founder panel | `src/routes/about.tsx` — it is marked as a placeholder |
| Sitemap domain | `public/sitemap.xml` and `public/robots.txt` |

After you have a real domain, put it in `site.url` so each page’s canonical link is correct.

Photographs in `public/images/` are generated studio images for this starter. Replace them with your own photos when you have them, and keep the same filenames or update the paths in the data files.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/services` | Consultations and the enquiry form |
| `/about` | Studio story and founder placeholder |
| `/shop` | Sample crystal catalogue and filters |
| `/shop/amethyst-cluster` (and the other slugs) | Product page |
| `/checkout` | Demo review. No payment. |
| `/journal` and `/journal/...` | Sample articles |
| `/contact` | Placeholder details, message form, API health |
| `/privacy`, `/terms` | Sample policies |
| `/api/v1/health` | JSON health check |

## What is a demo

- Crystal prices, stock, and descriptions
- The cart (saved only in this browser)
- Checkout (explicitly does not take payment)
- Both forms (they validate, then say they were **not** sent)
- Contact email, phone, and city
- Founder biography
- Journal essays

## What a later phase can add

See [docs/next-phase.md](docs/next-phase.md). In short: a real database, saved enquiries, accounts, inventory, and Cashfree payments checked on the server. Do not put payment secrets in the website code. Do not treat a checkout redirect as proof that someone paid.

## Common problems

**The page is blank.** Stop the dev server and run `npm run dev` again. If it still fails, run `npm install` and read the error in the terminal.

**A font looks like a fallback.** The site loads Fraunces and Outfit from Google Fonts. You need a network connection the first time. If those are blocked, the text still shows in a serif or sans-serif fallback.

**`npm run typecheck` complains about the route tree.** Start `npm run dev` once so `src/routeTree.gen.ts` can be generated, then run the check again.

**Python says `ModuleNotFoundError: app`.** Run `pytest` and `uvicorn` from the `backend` folder, with the virtual environment activated.

**The contact page says the API is down.** Either leave `VITE_API_BASE_URL` unset, or start the Python app on port 8000 and set the variable to `http://127.0.0.1:8000`. Also set `FRONTEND_ORIGIN` in `backend/.env` to the site’s address.

**Port already in use.** Another copy is still running. Stop it with `Ctrl+C`, or close that terminal, then start again.
