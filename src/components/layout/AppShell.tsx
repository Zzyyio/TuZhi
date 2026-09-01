import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, MessagesSquare, ScanLine, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n/lang";
import { cn } from "@/lib/utils";
import { AuthChip } from "./AuthChip";
import { LanguageToggle } from "./LanguageToggle";
import { SiteFooter } from "./SiteFooter";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();
  const nav = [
    { to: "/", label: t.nav.home, icon: Home },
    { to: "/diagnose", label: t.nav.diagnose, icon: ScanLine },
    { to: "/knowledge", label: t.nav.knowledge, icon: BookOpen },
    { to: "/community", label: t.nav.community, icon: MessagesSquare },
    { to: "/me", label: t.nav.me, icon: UserRound },
  ] as const;

  if (pathname === "/login") {
    return <div className="min-h-dvh bg-bg text-ink">{children}</div>;
  }

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt="" width={44} height={44} className="size-11 rounded-xl" />
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold">{t.name}</span>
              <span className="block truncate text-sm text-muted">{t.tagline}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to))
                    ? "bg-forest text-forest-fg"
                    : "text-muted hover:bg-surface-2 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/encyclopedia"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium",
                pathname.startsWith("/encyclopedia") ? "bg-forest text-forest-fg" : "text-muted hover:bg-surface-2",
              )}
            >
              {t.nav.wiki}
            </Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <AuthChip />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 md:pb-10">
        {children}
        <SiteFooter />
      </main>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
        aria-label={t.nav.home}
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium",
                    active ? "text-forest" : "text-muted",
                  )}
                >
                  <Icon className="size-6" strokeWidth={active ? 2.4 : 1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
