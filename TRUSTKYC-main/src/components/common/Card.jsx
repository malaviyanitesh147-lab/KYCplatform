import { cn } from "../../utils/utils";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action, className = "" }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 mb-4", className)}>
      <h3 className="text-[15px] sm:text-[16px] font-bold text-foreground tracking-tight">{children}</h3>
      {action && <div>{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, delta, icon, accent = "default", className = "" }) {
  const iconBgStyles = {
    default: "bg-[#F1F3F6] text-[#263445] border-[#E8EBEF]",
    primary: "bg-[#DDF8FC] text-[#007B83] border-[#BAEDF7]",
    success: "bg-[#DDF8E8] text-[#1E824C] border-[#C2EED4]",
    warning: "bg-[#FFF1C7] text-[#B45309] border-[#FCE19C]",
    destructive: "bg-[#FCE4E4] text-[#D32F2F] border-[#F9C3C3]",
    pink: "bg-[#FBE5EF] text-[#A21B5D] border-[#F6C6DC]",
  };

  return (
    <Card className={cn("flex flex-col justify-between space-y-3.5 hover:-translate-y-0.5", className)}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        {icon && (
          <div className={cn("size-8.5 rounded-lg border flex items-center justify-center shrink-0", iconBgStyles[accent] || iconBgStyles.default)}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-[22px] sm:text-[24px] font-bold tracking-tight text-foreground font-sans">
          {value}
        </div>
        {delta && <div className="text-[12px] text-muted-foreground mt-1 font-medium">{delta}</div>}
      </div>
    </Card>
  );
}
