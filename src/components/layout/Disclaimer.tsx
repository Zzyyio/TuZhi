import { useI18n } from "@/lib/i18n/lang";
import { cn } from "@/lib/utils";

export function DisclaimerBanner({
  full = false,
  className,
}: {
  full?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <p
      className={cn(
        "rounded-lg border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted",
        className,
      )}
      role="note"
    >
      {full ? t.disclaimer : t.disclaimerShort}
    </p>
  );
}
