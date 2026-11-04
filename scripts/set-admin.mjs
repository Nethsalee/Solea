import { tools } from "./firebase-tools.mjs";
const uid = process.argv[2];
if (!uid || uid.startsWith("--") || uid.length > 128) { console.error("Usage: npm run admin:grant -- FIREBASE_USER_UID [--revoke]"); process.exitCode = 1; }
else {
  try {
    const { auth, projectId } = tools();
    const user = await auth.getUser(uid);
    const claims = { ...user.customClaims };
    if (process.argv.includes("--revoke")) delete claims.admin; else claims.admin = true;
    await auth.setCustomUserClaims(uid, claims);
    if (process.argv.includes("--revoke")) await auth.revokeRefreshTokens(uid);
    console.log(`Project ${projectId}: administrator access ${process.argv.includes("--revoke") ? "removed" : "granted"} for the specified user. Sign out and sign in again.`);
  } catch { console.error("Unable to update administrator access. Check the UID and server credentials."); process.exitCode = 1; }
}
