"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import Reveal from "./Reveal";

type Mode = "login" | "register" | "reset";
function errorMessage(error: unknown) {
  const code = error instanceof FirebaseError ? error.code : "";
  const messages: Record<string, string> = {
    "auth/invalid-credential": "The email or password is incorrect. Please try again.",
    "auth/user-not-found": "The email or password is incorrect. Please try again.",
    "auth/wrong-password": "The email or password is incorrect. Please try again.",
    "auth/email-already-in-use": "Unable to create an account with these details. Try signing in or resetting your password.",
    "auth/weak-password": "Choose a stronger password with at least 8 characters.",
    "auth/password-does-not-meet-requirements": "Your password does not meet the account requirements. Try a longer password with upper and lowercase letters, numbers, and symbols.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please wait a little and try again.",
    "auth/network-request-failed": "Check your internet connection and try again.",
    "auth/popup-closed-by-user": "The Google sign-in window was closed. You can try again.",
    "auth/popup-blocked": "Allow popups for this site to continue with Google.",
    "auth/unauthorized-domain": "Sign-in is unavailable on this domain. Please contact the store.",
    "auth/operation-not-allowed": "This sign-in method is currently unavailable. Please try another method.",
    "auth/account-exists-with-different-credential": "Please sign in using the method you originally used for this account.",
  };
  return messages[code] ?? "We couldn’t complete that request. Please try again.";
}
export default function LoginForm() {
  const router = useRouter();
  const { user, loading, error: connectionError } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function changeMode(next: Mode) { setMode(next); setError(""); setMessage(""); setPassword(""); setConfirmation(""); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !firebaseConfigured) return;
    setError(""); setMessage("");
    if (mode === "register" && password !== confirmation) { setError("Your passwords do not match."); return; }
    setBusy(true);
    try {
      const auth = getFirebaseAuth();
      if (mode === "reset") {
        await sendPasswordResetEmail(auth, email.trim());
        setMessage("If an account exists for that email, you’ll receive a password reset link. Check your inbox and spam folder.");
      } else if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setPassword(""); setConfirmation("");
        router.replace("/");
      } else { await signInWithEmailAndPassword(auth, email.trim(), password); setPassword(""); router.replace("/"); }
    } catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  async function google() {
    setBusy(true); setError(""); setMessage("");
    try { await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider()); router.replace("/"); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError(""); setMessage("");
    try { await signOut(getFirebaseAuth()); setMode("login"); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  return <div className="catalog-page auth-page"><div className="container"><Reveal><div className="auth-layout">
    <aside className="auth-story"><Image src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1100&h=1400&fit=crop" alt="SOLEA everyday footwear in warm neutral tones" fill priority sizes="(max-width: 800px) 100vw, 45vw" /><div className="auth-story-copy"><p className="section-label">Your everyday, considered.</p><h2>Good to have<br /><em>you here.</em></h2><p>A fresh perspective.<br />A new favourite pair. Your next step.</p><Link href="/collections">Explore the collections ↗</Link></div></aside>
    <section className="auth-panel" aria-labelledby="auth-title"><Link href="/" className="auth-back">← Back to SOLEA</Link>
      {loading ? <p role="status">Connecting to your account…</p> : user ? <><p className="section-label">Your SOLEA Account</p><h1 id="auth-title">You’re right<br /><em>at home.</em></h1><p className="auth-intro">Signed in as <strong>{user.email ?? user.displayName ?? "SOLEA member"}</strong>.</p><Link href="/" className="btn-primary">Go to Home ↗</Link><button className="auth-text-button auth-signout" disabled={busy} onClick={logout}>{busy ? "Signing out…" : "Sign out"}</button></> : <>
      <p className="section-label">{mode === "register" ? "Join SOLEA" : mode === "reset" ? "A fresh start" : "Welcome back"}</p><h1 id="auth-title">{mode === "register" ? <>Make yourself<br /><em>at home.</em></> : mode === "reset" ? <>Let’s get you<br /><em>back in.</em></> : <>Your next step<br /><em>starts here.</em></>}</h1><p className="auth-intro">{mode === "register" ? "Create your SOLEA account with your email and a password." : mode === "reset" ? "Enter your email and we’ll send you a link to reset your password." : "Sign in to your SOLEA account."}</p>
      <form onSubmit={submit} className="auth-form" aria-busy={busy}><fieldset disabled={busy || !firebaseConfigured || !!connectionError}>
        <label htmlFor="auth-email">Email address</label><input id="auth-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={254} />
        {mode !== "reset" && <><label htmlFor="auth-password">Password</label><div className="auth-password"><input id="auth-password" type={showPassword ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={mode === "register" ? 8 : undefined} maxLength={4096} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div></>}
        {mode === "register" && <><p className="auth-hint">Use at least 8 characters.</p><label htmlFor="auth-confirm">Confirm password</label><input id="auth-confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmation} onChange={e => setConfirmation(e.target.value)} required minLength={8} maxLength={4096} /></>}
        {mode === "login" && <button type="button" className="auth-text-button auth-forgot" onClick={() => changeMode("reset")}>Forgot password?</button>}
        <button type="submit" className="btn-primary auth-submit">{busy ? "Please wait…" : mode === "register" ? "Create account ↗" : mode === "reset" ? "Send reset link ↗" : "Sign in ↗"}</button>
      </fieldset></form>
      {mode !== "reset" && <><div className="auth-divider"><span>or</span></div><button type="button" className="auth-google" disabled={busy || !firebaseConfigured || !!connectionError} onClick={google}>Continue with Google</button></>}
      <p className="auth-switch">{mode === "login" ? "New to SOLEA? " : mode === "register" ? "Already have an account? " : "Remember your password? "}<button className="auth-text-button" disabled={busy} onClick={() => changeMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Create an account" : "Sign in"}</button></p>
      {!firebaseConfigured && <p className="auth-notice" role="status">Account sign-in isn’t available yet. Please check back soon.</p>}
      </>}
      {(error || connectionError) && <p className="auth-error" role="alert">{error || connectionError}</p>}{message && <p className="auth-notice" role="status">{message}</p>}
    </section>
  </div></Reveal></div></div>;
}
