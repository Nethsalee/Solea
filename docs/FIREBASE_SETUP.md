# Firebase login setup

The `/login` page supports email/password registration and login, Google sign-in, password reset, persisted browser sessions, and sign-out. The header account icon and mobile menu open it. Without configuration, the page renders with sign-in disabled.

## 1. Create your Firebase project

1. Open https://console.firebase.google.com/ and sign in with your Google account.
2. Create a project (for example, `SOLEA`). Google Analytics is optional for this login implementation.
3. Open Project settings (gear icon), then General.
4. Under Your apps, select the Web icon (`</>`) and register an app named `SOLEA Web`. Firebase Hosting is not required.
5. Find the app's Firebase configuration object. Keep it available for step 3.

## 2. Enable the login methods

1. Open Build > Authentication and select Get started if prompted.
2. Open Sign-in method, enable Email/Password, and Save. Email link sign-in is not used by this page.
3. Enable Google, select a project support email, and Save.
4. Under Authentication > Settings > Authorized domains, add `localhost` if it is missing. Add your deployment hostname when you deploy (hostname only, without `https://` or paths).
5. Under Authentication > Templates, review the password reset email's sender and wording. Firebase hosts the reset-password action page, so no separate reset route is needed.

## 3. Add the web configuration locally

Create `.env.local` in `C:\Users\USER\Desktop\E Commerce` with the following values from the web app configuration. If the file already exists, add these lines without replacing other settings:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=your_apiKey_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_authDomain_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_projectId_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_appId_value
```

Replace the full placeholder values (no `your_` prefix should remain). Map `apiKey`, `authDomain`, `projectId`, and `appId` exactly. The existing `.env.local.example` also lists these variables. No service-account private key or Firebase Admin credentials are needed. The Firebase web configuration is public client configuration; `.env.local` is ignored by Git.

## 4. Start and test

1. Stop your dev server with Ctrl+C, then run `npm run dev` from the project directory. Environment changes require restarting Next.js.
2. Open `http://localhost:3000/login` (or the port printed in the terminal).
3. Choose Create an account, use an email you control, enter a password of at least 8 characters, confirm it, and submit.
4. Confirm that the signed-in account view appears. Refresh to check session persistence.
5. In Firebase > Authentication > Users, check that the account appears.
6. Sign out, then sign in again with the same credentials.
7. Sign out, select Forgot password, enter your email, and check your inbox/spam folder. Follow the Firebase email link to set a new password; sign in with it.
8. Sign out and test Continue with Google. Allow the popup if prompted.
9. Check a wrong password, mismatched registration passwords, and the account link in the mobile menu.

## 5. Deployment

Add the same four environment variables to your hosting provider, add the deployed hostname to Firebase Authorized domains, and rebuild/redeploy. `NEXT_PUBLIC_` variables are embedded at build time. Test login on the deployed domain too.

## Troubleshooting

- Sign-in is unavailable: check all four variables and restart the dev server. This is the expected state before configuration.
- Unauthorized domain: add the exact hostname in Authentication > Settings > Authorized domains.
- Sign-in method unavailable: enable the corresponding provider under Sign-in method.
- Google popup blocked: allow popups for the site and try again.
- Invalid API key: use the web app configuration from the correct project.
- Stronger-password error: follow your Firebase project's password policy. The form requires at least eight characters for registration; Firebase also enforces its configured policy.

## Implementation scope

Firebase Authentication manages identities and browser sessions. This change does not create order/profile storage or enforce authentication on server routes. If private APIs or customer data are added later, verify Firebase ID tokens on the server and configure database security rules before exposing that data.

Official references:
- https://firebase.google.com/docs/web/setup
- https://firebase.google.com/docs/auth/web/password-auth
- https://firebase.google.com/docs/auth/web/google-signin
- https://firebase.google.com/docs/auth/web/auth-state-persistence
