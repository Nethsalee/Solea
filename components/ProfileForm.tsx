"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, updateProfile, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";

function ProfileDetails({ user }: { user: User }) {
  const router = useRouter();
  const [name, setName] = useState(user.displayName ?? "");
  const [pending, setPending] = useState<"save" | "signout" | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setMessage("");
    const displayName = name.trim();
    if (!displayName || displayName.length > 80) {
      setError("Enter a display name between 1 and 80 characters.");
      return;
    }
    setPending("save");
    setError("");
    try {
      await updateProfile(user, { displayName });
      setName(displayName);
      setMessage("Profile saved.");
    } catch {
      setError("Your profile could not be saved. Please try again.");
    } finally {
      setPending(null);
    }
  }

  async function logout() {
    if (pending) return;
    setPending("signout");
    setError("");
    setMessage("");
    try {
      await signOut(getFirebaseAuth());
      router.replace("/");
    } catch {
      setError("You could not be signed out. Please try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <>
      <form className="auth-form" onSubmit={save} aria-busy={pending === "save"}>
        <fieldset disabled={!!pending}>
          <label htmlFor="profile-name">Display name</label>
          <input id="profile-name" autoComplete="name" value={name} maxLength={80} required onChange={event => {
            setName(event.target.value);
            setMessage("");
            setError("");
          }} />
          <label htmlFor="profile-email">Email address</label>
          <input id="profile-email" type="email" value={user.email ?? ""} readOnly />
          <button className="btn-primary auth-submit" type="submit">
            {pending === "save" ? "Saving…" : "Save profile"}
          </button>
        </fieldset>
      </form>
      <Link href="/favorites" className="btn-ghost profile-favorites">My favorites ↗</Link>
      <button type="button" className="auth-text-button auth-signout" onClick={logout} disabled={!!pending}>
        {pending === "signout" ? "Signing out…" : "Sign out"}
      </button>
      {error && <p className="auth-error" role="alert">{error}</p>}
      {message && <p className="auth-notice" role="status">{message}</p>}
    </>
  );
}

export default function ProfileForm() {
  const { user, loading, error } = useAuth();

  return (
    <div className="catalog-page auth-page">
      <div className="container">
        <section className="auth-panel profile-panel" aria-labelledby="profile-title">
          <Link href="/" className="auth-back">← Back to SOLEA</Link>
          <h1 id="profile-title">My profile</h1>
          {loading ? <p className="auth-intro" role="status">Loading your profile…</p>
            : error ? <p className="auth-error" role="alert">{error}</p>
            : user ? <ProfileDetails key={user.uid} user={user} />
            : <>
                <p className="auth-intro">Sign in to view and edit your profile.</p>
                <Link href="/login?next=profile" className="btn-primary">Sign in ↗</Link>
              </>}
        </section>
      </div>
    </div>
  );
}
