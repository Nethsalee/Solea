import "server-only";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
export function adminApp() {
  const name = "solea-backend";
  const existing = getApps().find(app => app.name === name);
  if (existing) return existing;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  if (!projectId || projectId.startsWith("your_")) throw new Error("Firebase Admin configuration is missing.");
  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && projectId !== process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) throw new Error("Firebase client and server projects must match.");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!!clientEmail !== !!privateKey) throw new Error("Incomplete Firebase Admin credentials.");
  const credential = clientEmail && privateKey ? cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }) : applicationDefault();
  return initializeApp({ credential, projectId }, name);
}
export const adminAuth = () => getAuth(adminApp());
export const adminDb = () => getFirestore(adminApp());
