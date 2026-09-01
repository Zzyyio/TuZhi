import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useI18n } from "@/lib/i18n/lang";

export function AuthChip() {
  const { isPending } = useCurrentUserState();
  const { t } = useI18n();
  if (isPending) {
    return <div className="size-10 shrink-0 animate-pulse rounded-lg bg-surface-2" />;
  }
  return (
    <>
      <SignedOut>
        <Link
          to="/login"
          className="inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg"
        >
          {t.nav.login}
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
