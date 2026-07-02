"use client";

import { useEffect, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import AdminDashboard from "./admin-dashboard";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const client = getSupabaseBrowser();
    setSupabase(client);
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = client.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    if (!supabase) return;
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) setError(error.message);
  };

  if (!ready || !supabase) {
    return (
      <main className={styles.centerWrap}>
        <p className={styles.loading}>Loading…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={styles.centerWrap}>
        <form className={styles.loginCard} onSubmit={signIn}>
          <p className={styles.kicker}>PRIVATE PORTAL</p>
          <h1 className={styles.loginTitle}>Sign in</h1>
          <input
            className={styles.loginInput}
            type="email"
            placeholder="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.loginInput}
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.primaryBtn} type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Enter"}
          </button>
          {error && <p className={styles.loginError}>{error}</p>}
        </form>
      </main>
    );
  }

  return <AdminDashboard supabase={supabase} session={session} />;
}
