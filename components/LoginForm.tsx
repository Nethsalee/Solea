"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";

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
export default function LoginForm({ destination = "/" }: { destination?: "/" | "/profile" }) {
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
  function changeMode(next: Mode) { setMode(next); setError(""); setMessage(""); setPassword(""); setConfirmation(""); setShowPassword(false); }
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
        router.replace(destination);
      } else { await signInWithEmailAndPassword(auth, email.trim(), password); setPassword(""); router.replace(destination); }
    } catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  async function google() {
    setBusy(true); setError(""); setMessage("");
    try { await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider()); router.replace(destination); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError(""); setMessage("");
    try { await signOut(getFirebaseAuth()); setMode("login"); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  const disabled = busy || !firebaseConfigured || !!connectionError;
  const title = loading ? "Your account" : user ? "You’re signed in" : {
    login: "Welcome back",
    register: "Create an account",
    reset: "Reset your password",
  }[mode];
  const submitLabel = {
    login: "Sign in",
    register: "Create account",
    reset: "Send reset link",
  }[mode];

  return (
    <div className="catalog-page auth-page login-page">
      <div className="container">
        <div className="auth-layout">
          <section className="auth-panel login-panel" aria-labelledby="auth-title">
            <div className="login-content">
              <Link href="/" className="auth-back">← Back to SOLEA</Link>
              <h1 id="auth-title">{title}</h1>

              {loading ? (
                <p className="auth-intro" role="status">Connecting to your account…</p>
              ) : user ? (
                <>
                  <p className="auth-intro">{user.email ?? user.displayName ?? "SOLEA member"}</p>
                  <Link href="/profile" className="btn-primary auth-submit">My profile <span aria-hidden="true">↗</span></Link>
                  <button type="button" className="auth-text-button auth-signout" disabled={busy} onClick={logout}>
                    {busy ? "Signing out…" : "Sign out"}
                  </button>
                </>
              ) : (
                <>
                  {mode === "reset" && (
                    <p className="auth-intro">Enter your email and we’ll send you a link to reset your password.</p>
                  )}
                  <form onSubmit={submit} className="auth-form" aria-busy={busy}>
                    <fieldset disabled={disabled}>
                      <label htmlFor="auth-email">Email address</label>
                      <input id="auth-email" name="email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required maxLength={254} />
                      {mode !== "reset" && (
                        <>
                          <label htmlFor="auth-password">Password</label>
                          <div className="auth-password">
                            <input id="auth-password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={event => setPassword(event.target.value)} required minLength={mode === "register" ? 8 : undefined} maxLength={4096} aria-describedby={mode === "register" ? "auth-password-hint" : undefined} />
                            <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? "Hide" : "Show"}
                            </button>
                          </div>
                        </>
                      )}
                      {mode === "register" && (
                        <>
                          <p id="auth-password-hint" className="auth-hint">Use at least 8 characters.</p>
                          <label htmlFor="auth-confirm">Confirm password</label>
                          <input id="auth-confirm" type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmation} onChange={event => setConfirmation(event.target.value)} required minLength={8} maxLength={4096} />
                        </>
                      )}
                      {mode === "login" && (
                        <button type="button" className="auth-text-button auth-forgot" onClick={() => changeMode("reset")}>
                          Forgot password?
                        </button>
                      )}
                      <button type="submit" className="btn-primary auth-submit">
                        {busy ? "Please wait…" : submitLabel}
                        {!busy && <span aria-hidden="true">↗</span>}
                      </button>
                    </fieldset>
                  </form>
                  {mode !== "reset" && (
                    <>
                      <div className="auth-divider">or</div>
                      <button type="button" className="auth-google" disabled={disabled} onClick={google}>
                        Continue with Google
                      </button>
                    </>
                  )}
                  <p className="auth-switch">
                    {mode === "login" ? "New to SOLEA? " : mode === "register" ? "Already have an account? " : ""}
                    <button type="button" className="auth-text-button" disabled={busy} onClick={() => changeMode(mode === "login" ? "register" : "login")}>
                      {mode === "login" ? "Create an account" : mode === "reset" ? "Back to sign in" : "Sign in"}
                    </button>
                  </p>
                  {!firebaseConfigured && <p className="auth-notice" role="status">Account sign-in isn’t available yet. Please check back soon.</p>}
                </>
              )}
              {(error || connectionError) && <p className="auth-error" role="alert">{error || connectionError}</p>}
              {message && <p className="auth-notice" role="status">{message}</p>}
            </div>
          </section>

          <aside className="auth-story">
            <Image
              src="/images/nova-street-catalog-v2.png"
              alt="Clay and cream sneakers"
              fill
              sizes="(max-width: 760px) 1px, (max-width: 1150px) 48vw, 545px"
            />
            <div className="auth-story-copy">
              <Link href="/collections">Explore the collections <span aria-hidden="true">↗</span></Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
