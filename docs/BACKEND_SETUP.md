# Backend setup — first milestone

Implemented: Firebase Admin authentication, GET /api/me, Firestore catalog reads, protected product create/update APIs, a product editor at /admin/products, and a safe catalog importer. Men, Women, Kids, Home, Search, and product-detail pages read through the same catalog source.

The site starts with CATALOG_SOURCE=local. Firestore mode must be enabled deliberately after importing. There is no automatic fallback to local data when Firestore fails.

## 1. Create the database in your existing Firebase project

1. Open https://console.firebase.google.com/ and choose the same project used for login.
2. Open Build > Firestore Database > Create database.
3. Choose Standard edition if an edition is requested, and create the `(default)` database.
4. Select a region suitable for your customers and application hosting. Check it before confirming; changing database location later requires migration.
5. Select production mode if prompted.
6. Open the Rules tab. For a new database dedicated to this app, replace its rules with the contents of `firestore.rules` in this repository and Publish.

The supplied rules deny direct browser database access. This app accesses the database through Next.js server routes; Firebase Admin uses its server credentials. If this is a shared database with another app, review its existing rules before replacing them.

## 2. Configure the server credentials locally

1. In Firebase Console, open Project settings > Service accounts > Firebase Admin SDK.
2. Select Generate new private key and download the JSON file. Treat this file as a password: do not paste it into chat or upload it to the website.
3. Create `.secrets` inside the project and place the downloaded file there, renamed `firebase-admin.json`.
4. Open or create `.env.local` in the project root. Keep all existing login configuration intact. Add:

```dotenv
FIREBASE_ADMIN_PROJECT_ID=YOUR_EXISTING_PROJECT_ID
GOOGLE_APPLICATION_CREDENTIALS=C:/Users/USER/Desktop/E Commerce/.secrets/firebase-admin.json
CATALOG_SOURCE=local
```

Use the `project_id` from the downloaded JSON for FIREBASE_ADMIN_PROJECT_ID. It must match NEXT_PUBLIC_FIREBASE_PROJECT_ID from your working login setup. Do not add NEXT_PUBLIC_ to Admin settings.

The `.secrets` directory and local env files are ignored by Git. The downloadable example is `.env.backend.example`. No real credentials were added by Codex.

## 3. Validate and import the existing products

Open PowerShell in the project directory:

```powershell
npm run db:seed
```

This validates the catalog without writing anything. Once it succeeds:

```powershell
npm run db:seed -- --write
```

The import creates the product documents in Firestore. Existing documents are kept unchanged, so rerunning does not reset prices or edits. In Firebase Console > Firestore > Data, check the `products` collection. Each record contains `priceMinor` in cents, `currency` USD, `department`, `status`, images, sizes, and colours.

The starter catalog, prices, availability, and generated imagery are sample store content. Review them before using them for real sales. Variant-level inventory and checkout are later milestones.

## 4. Grant your account administrator access

1. Sign in to the store normally so your user account exists.
2. In Firebase Console > Authentication > Users, find your account and copy its UID (not its email).
3. Run:

```powershell
npm run admin:grant -- YOUR_FIREBASE_USER_UID
```

4. Sign out of SOLEA, then sign in again to receive the updated role.
5. Never grant this role to ordinary customers.

To remove the role later:

```powershell
npm run admin:grant -- YOUR_FIREBASE_USER_UID --revoke
```

Other custom claims are preserved. Revoking the role also revokes refresh tokens; protected APIs check token revocation.

## 5. Test the editor before switching the storefront

1. Stop the dev server with Ctrl+C, then start it with `npm run dev`.
2. Open http://localhost:3000/admin/products (use the port shown in your terminal).
3. Select an imported product. Confirm its name, images, price, and sizes appear.
4. Change a product name or price and Save changes.
5. Check the corresponding Firestore document to confirm it changed.
6. An ordinary signed-in account must get an administrator-access error. A signed-out visitor must be asked to sign in.

The editor supports create, update, draft/active visibility, featured/new-arrival flags, and an availability flag. Existing product colours and detail information are preserved during edits. New products can start with one colour. Image upload is not part of this phase: use existing `/images/` assets or approved Unsplash URLs.

## 6. Enable the database-backed storefront

1. In `.env.local`, change just this setting:

```dotenv
CATALOG_SOURCE=firestore
```

2. Restart the dev server.
3. Open the appropriate Men/Women/Kids page and the edited product page. Confirm the saved values appear.
4. Check Home, Search, Sale, and New Arrivals too. They use the same database-backed catalog.
5. Set a test product to Draft in the editor. It should disappear from public lists and its public detail route should return not found.
6. Restore it to Active when finished. Refresh an already-open storefront tab to load changes.

If a setup problem prevents the site from loading, temporarily return CATALOG_SOURCE to local and restart. Check credentials, project ID, and database creation before switching back.

## 7. Hosting later

Set CATALOG_SOURCE=firestore and FIREBASE_ADMIN_PROJECT_ID on the host. On Google-hosted environments, use the platform's supported service identity/Application Default Credentials with appropriate database and Auth permissions. On other hosts, set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY as private environment variables from the service-account JSON, instead of a local credentials-file path. Preserve literal `\n` escapes when entering a PEM key on a single line. Keep the Firebase browser variables as already configured. Rebuild and redeploy.

## Routes and validation

- GET /api/products: public active catalog, optional department/category/featured filters; returns up to 500 active products.
- GET /api/me: verified user identity. Requires Authorization: Bearer <Firebase ID token>. Visiting directly without a token should return 401 even when the browser login exists.
- GET /api/admin/products: admin-only catalog, including drafts, up to 500 records.
- POST /api/admin/products: admin-only product creation; duplicate IDs return 409.
- PUT /api/admin/products/:id: admin-only full product replacement; invalid input returns 400.

The editor attaches the token automatically. The API checks the verified `admin` claim and does not trust a role, user ID, or price sent by a customer. Product prices are integer minor units in storage and converted for the existing storefront display.

This phase does not add payments, order creation, stock quantities/reservations, customer profile storage, image upload, or a newsletter provider. Those follow after this milestone works.

References:
- https://firebase.google.com/docs/admin/setup
- https://firebase.google.com/docs/auth/admin/verify-id-tokens
- https://firebase.google.com/docs/auth/admin/custom-claims
- https://firebase.google.com/docs/firestore/quickstart-server
