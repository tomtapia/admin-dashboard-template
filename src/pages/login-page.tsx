import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-context";

export const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async () => {
    setIsPending(true);
    try {
      await login();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-panel)] lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                Northstar
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">Admin workspace</p>
            </div>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-panel)] px-3 py-1 text-[11px] font-medium text-[var(--foreground-muted)]">
              Core Light
            </span>
          </div>

          <div className="mt-10 max-w-xl space-y-4">
            <h1 className="text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--foreground)] lg:text-[3.25rem]">
              Operations, billing and access in one clean control surface.
            </h1>
            <p className="text-[15px] leading-7 text-[var(--foreground-muted)]">
              This template is designed to feel like real product software: compact, readable and
              production-ready.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-panel)] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                    Today
                  </p>
                  <p className="mt-1 text-sm font-medium">Workspace briefing</p>
                </div>
                <span className="rounded-full bg-[var(--success-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--success)]">
                  Stable
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["ARR", "$482K"],
                  ["At-risk renewals", "3"],
                  ["Pending invites", "2"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                      {label}
                    </p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-panel)] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Next actions
              </p>
              <div className="mt-4 space-y-3">
                {["Review failed invoices", "Approve pending invites", "Follow up on renewals"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--foreground)]"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-panel)] lg:p-10">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                Mock sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                Open the dashboard with a seeded workspace, demo data and two polished themes.
              </p>
            </div>
            <div className="mt-8 space-y-5">
              <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-panel)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  Workspace
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                  Northstar / Production
                </p>
              </div>
              <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-panel)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  Includes
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  Overview, users, workspace and user settings, themes and mock auth flow.
                </p>
              </div>
              <Button
                onClick={() => void handleLogin()}
                className="w-full justify-between"
                size="lg"
                disabled={isPending}
                aria-busy={isPending}
              >
                <span className="flex items-center gap-2">
                  {isPending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : null}
                  {isPending ? t("login.entering") : t("login.enter")}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
