import { cn } from "@/utils/utils";
import {
  Card,
  SectionTitle,
  StatCard,
  StatusBadge,
  EmptyState,
  LoadingSkeleton,
} from "@/components/ui-bits";

export { Card, SectionTitle, StatCard, StatusBadge, EmptyState, LoadingSkeleton };

/** @deprecated Prefer Card from ui-bits */
export function Panel({ children, className, glow }) {
  return <Card className={cn(glow && "shadow-md", className)}>{children}</Card>;
}

export function PageHeader({ title, description, actions, kicker }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        {kicker && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
            {kicker}
          </div>
        )}
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-foreground font-sans leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-[13px] sm:text-sm text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}
