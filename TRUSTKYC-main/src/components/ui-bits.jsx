import React from "react";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Inbox,
  Loader2,
} from "lucide-react";

/** Adminex Status Badge with pastel backgrounds and clear text */
export function StatusBadge({ status, className = "" }) {
  if (!status) status = "Draft";
  const raw = String(status).trim().toUpperCase();

  const map = {
    VERIFIED: {
      bg: "bg-[#DDF8E8] dark:bg-emerald-950/40 text-[#1E824C] dark:text-emerald-400 border-[#C2EED4] dark:border-emerald-800/60",
      dot: "bg-[#22C55E]",
      label: "Verified",
    },
    APPROVED: {
      bg: "bg-[#DDF8E8] dark:bg-emerald-950/40 text-[#1E824C] dark:text-emerald-400 border-[#C2EED4] dark:border-emerald-800/60",
      dot: "bg-[#22C55E]",
      label: "Approved",
    },
    ACTIVE: {
      bg: "bg-[#DDF8E8] dark:bg-emerald-950/40 text-[#1E824C] dark:text-emerald-400 border-[#C2EED4] dark:border-emerald-800/60",
      dot: "bg-[#22C55E]",
      label: "Active",
    },
    COMPLETED: {
      bg: "bg-[#DDF8FC] dark:bg-sky-950/40 text-[#007B83] dark:text-sky-400 border-[#BAEDF7] dark:border-sky-800/60",
      dot: "bg-[#0ea5e9]",
      label: "Completed",
    },
    RESOLVED: {
      bg: "bg-[#DDF8FC] dark:bg-teal-950/40 text-[#007B83] dark:text-teal-400 border-[#BAEDF7] dark:border-teal-800/60",
      dot: "bg-[#14b8a6]",
      label: "Resolved",
    },
    PENDING: {
      bg: "bg-[#FFF1C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-400 border-[#FCE19C] dark:border-amber-800/60",
      dot: "bg-[#F59E0B]",
      label: "Pending",
    },
    SUBMITTED: {
      bg: "bg-[#DDF8FC] dark:bg-blue-950/40 text-[#007B83] dark:text-blue-400 border-[#BAEDF7] dark:border-blue-800/60",
      dot: "bg-[#4285F4] animate-pulse",
      label: "Submitted",
    },
    UNDER_REVIEW: {
      bg: "bg-[#FFF1C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-400 border-[#FCE19C] dark:border-amber-800/60",
      dot: "bg-[#F59E0B] animate-pulse",
      label: "Under Review",
    },
    DRAFT: {
      bg: "bg-[#F1F3F6] dark:bg-slate-800/60 text-[#5A6472] dark:text-slate-400 border-[#E8EBEF] dark:border-slate-700",
      dot: "bg-slate-400",
      label: "Draft",
    },
    REJECTED: {
      bg: "bg-[#FCE4E4] dark:bg-rose-950/40 text-[#D32F2F] dark:text-rose-400 border-[#F9C3C3] dark:border-rose-800/60",
      dot: "bg-[#EB5757]",
      label: "Rejected",
    },
    DISPUTED: {
      bg: "bg-[#FCE4E4] dark:bg-rose-950/40 text-[#D32F2F] dark:text-rose-400 border-[#F9C3C3] dark:border-rose-800/60",
      dot: "bg-[#EB5757] animate-pulse",
      label: "Disputed",
    },
    CANCELLED: {
      bg: "bg-[#F1F3F6] dark:bg-slate-800/60 text-[#5A6472] dark:text-slate-400 border-[#E8EBEF] dark:border-slate-700",
      dot: "bg-slate-400",
      label: "Cancelled",
    },
    HIGH: {
      bg: "bg-[#FCE4E4] dark:bg-rose-950/40 text-[#D32F2F] dark:text-rose-400 border-[#F9C3C3] dark:border-rose-800/60",
      dot: "bg-[#EB5757]",
      label: "High",
    },
    MEDIUM: {
      bg: "bg-[#FFF1C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-400 border-[#FCE19C] dark:border-amber-800/60",
      dot: "bg-[#F59E0B]",
      label: "Medium",
    },
    LOW: {
      bg: "bg-[#DDF8E8] dark:bg-emerald-950/40 text-[#1E824C] dark:text-emerald-400 border-[#C2EED4] dark:border-emerald-800/60",
      dot: "bg-[#22C55E]",
      label: "Low",
    },
  };

  const current = map[raw] || {
    bg: "bg-[#F1F3F6] dark:bg-slate-800 text-[#5A6472] dark:text-slate-300 border-[#E8EBEF] dark:border-slate-700",
    dot: "bg-slate-400",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium border ${current.bg} ${className}`}
    >
      <span className={`size-1.5 rounded-full shrink-0 ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
}

/** Modern Adminex Stat KPI Card */
export function StatCard({
  label,
  value,
  delta,
  hint,
  icon,
  accent = "primary",
  trend,
  className = "",
}) {
  const subtext = delta ?? hint;

  const accentColors = {
    primary: "bg-[#DDF8FC] text-[#007B83] border-[#BAEDF7]",
    success: "bg-[#DDF8E8] text-[#1E824C] border-[#C2EED4]",
    warning: "bg-[#FFF1C7] text-[#B45309] border-[#FCE19C]",
    destructive: "bg-[#FCE4E4] text-[#D32F2F] border-[#F9C3C3]",
    pink: "bg-[#FBE5EF] text-[#A21B5D] border-[#F6C6DC]",
    neutral: "bg-[#F1F3F6] text-[#263445] border-[#E8EBEF]",
  };

  return (
    <div
      className={`glass-card p-4 sm:p-5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {icon && (
          <div
            className={`size-8.5 rounded-lg flex items-center justify-center border shrink-0 ${accentColors[accent] || accentColors.primary}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="text-[22px] sm:text-[24px] font-bold tracking-tight text-foreground font-sans">
        {value}
      </div>

      {subtext && (
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mt-2">
          {trend === "up" && <TrendingUp className="size-3.5 text-emerald-500 shrink-0" />}
          {trend === "down" && <TrendingDown className="size-3.5 text-rose-500 shrink-0" />}
          <span className="truncate">{subtext}</span>
        </div>
      )}
    </div>
  );
}

/** Standard Adminex Card */
export function Card({ children, className = "", noPadding = false }) {
  return (
    <div className={`glass-card ${noPadding ? "" : "p-4 sm:p-5 md:p-6"} ${className}`}>{children}</div>
  );
}

/** Clean Section Title with optional action button */
export function SectionTitle({ children, subtitle, action, className = "" }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
      <div>
        <h3 className="text-[15px] sm:text-[16px] font-bold tracking-tight text-foreground">
          {children}
        </h3>
        {subtitle && <p className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Helpful Empty State component */
export function EmptyState({
  icon: Icon = Inbox,
  title = "No records found",
  description = "Get started by adding or submitting a new record.",
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-xl border border-dashed border-border bg-card/50 ${className}`}
    >
      <div className="size-12 rounded-xl bg-[#F7F8FA] dark:bg-muted/80 border border-border flex items-center justify-center text-muted-foreground mb-4">
        <Icon className="size-6" />
      </div>
      <h4 className="text-[15px] font-semibold text-foreground">{title}</h4>
      <p className="text-[13px] text-muted-foreground max-w-sm mt-1 mb-5">{description}</p>
      {action}
    </div>
  );
}

/** Shimmer Loading Skeleton */
export function LoadingSkeleton({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg shimmer-loading"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
