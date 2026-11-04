import { createRequire, registerHooks } from "node:module";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith(".") && context.parentURL?.endsWith(".ts") && !specifier.endsWith(".ts")) return next(specifier + ".ts", context);
  return next(specifier, context);
} });
export function tools() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  if (!projectId || projectId.startsWith("your_")) throw new Error("Set FIREBASE_ADMIN_PROJECT_ID in .env.local first.");
  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && projectId !== process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) throw new Error("Client and Admin Firebase project IDs must match.");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!!clientEmail !== !!privateKey) throw new Error("Incomplete Firebase Admin credentials.");
  const credential = clientEmail && privateKey ? cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }) : applicationDefault();
  const app = getApps().find(a => a.name === "solea-scripts") ?? initializeApp({ credential, projectId }, "solea-scripts");
  return { db: getFirestore(app), auth: getAuth(app), projectId };
}
