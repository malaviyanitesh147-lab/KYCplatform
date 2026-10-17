import { cn } from "../../utils/utils";

export function StatusBadge({ status, className }) {
  const norm = (status || "").toLowerCase();

  let styles = "bg-[#F1F3F6] dark:bg-slate-800/60 text-[#5A6472] dark:text-slate-400 border-[#E8EBEF] dark:border-slate-700";
  let dotColor = "bg-slate-400";
  let label = status || "Unknown";

  if (
    norm.includes("verif") ||
    norm.includes("pass") ||
    norm.includes("success") ||
    norm.includes("approv")
  ) {
    styles = "bg-[#DDF8E8] dark:bg-emerald-950/40 text-[#1E824C] dark:text-emerald-400 border-[#C2EED4] dark:border-emerald-800/60";
    dotColor = "bg-[#22C55E]";
    label = status === "approved" || status === "APPROVED" ? "Approved" : "Verified";
  } else if (norm.includes("pend") || norm.includes("progress") || norm.includes("review")) {
    styles = "bg-[#FFF1C7] dark:bg-amber-950/40 text-[#B45309] dark:text-amber-400 border-[#FCE19C] dark:border-amber-800/60";
    dotColor = "bg-[#F59E0B]";
    label = norm.includes("review") ? "Under Review" : "Pending";
  } else if (norm.includes("submit")) {
    styles = "bg-[#DDF8FC] dark:bg-blue-950/40 text-[#007B83] dark:text-blue-400 border-[#BAEDF7] dark:border-blue-800/60";
    dotColor = "bg-[#4285F4]";
    label = "Submitted";
  } else if (norm.includes("draft")) {
    styles = "bg-[#F1F3F6] dark:bg-slate-800/60 text-[#5A6472] dark:text-slate-400 border-[#E8EBEF] dark:border-slate-700";
    dotColor = "bg-slate-400";
    label = "Draft";
  } else if (
    norm.includes("fail") ||
    norm.includes("reject") ||
    norm.includes("dispute") ||
    norm.includes("high")
  ) {
    styles = "bg-[#FCE4E4] dark:bg-rose-950/40 text-[#D32F2F] dark:text-rose-400 border-[#F9C3C3] dark:border-rose-800/60";
    dotColor = "bg-[#EB5757]";
    label = norm.includes("dispute")
      ? "Disputed"
      : norm.includes("reject")
        ? "Rejected"
        : "Flagged";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border",
        styles,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", dotColor)} />
      <span>{label}</span>
    </span>
  );
}

export default StatusBadge;
