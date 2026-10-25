# Later phases

Phase 1 is a designed website, a sample shop in the browser, and a health check. These pieces are shaped so the next phase can be added without throwing the pages away.

## Keep using

- `src/data/products.ts` and `src/data/services.ts` — swap the imports for an API client when PostgreSQL exists. The pages already read from those functions.
- `src/lib/site.ts` — `apiUrl()` prefixes `VITE_API_BASE_URL` when you outgrow the built-in health route.
- `src/lib/cart-math.ts` — quantity rules and subtotal. The same rules should be repeated on the server when orders are real. The browser copy is not authority.
- `backend/app/services/` — empty on purpose. Enquiry storage and order creation belong here, not in the React pages.

## Do not pretend these exist yet

- Accounts and an admin dashboard
- Saved consultation requests
- Inventory that more than one person shares
- Email
- Product image hosting beyond the files in `public/images/`
- Cashfree, or any other payment provider

## When payments are added

1. The server creates the payment order. The browser never sees the secret key.
2. The server verifies the payment with Cashfree.
3. The server checks the official webhook signature before it marks an order paid.
4. A redirect back to the site is not proof of payment.
5. Secrets stay in server environment variables, never in `src/` and never in git.

SQLAlchemy models and Alembic migrations can wait until there is a real table to migrate. There is no database in Phase 1.
