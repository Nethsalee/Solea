"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "@/lib/firebase";

const AuthContext = createContext<{ user: User | null; loading: boolean; error: string }>({ user: null, loading: true, error: "" });
export function useAuth() { return useContext(AuthContext); }
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!firebaseConfigured) return;
    try {
      return onAuthStateChanged(getFirebaseAuth(), value => { setUser(value); setLoading(false); }, () => { setError("Unable to connect to your account. Please refresh and try again."); setLoading(false); });
    } catch { setError("Unable to connect to your account. Please check the Firebase configuration."); setLoading(false); }
  }, []);
  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
}
