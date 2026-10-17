import { cn } from "../../utils/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all cursor-pointer select-none active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const variants = {
    primary: "bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium shadow-xs border border-transparent",
    secondary: "bg-card hover:bg-muted text-foreground border border-border font-medium shadow-2xs",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/70",
    destructive: "bg-[#EB5757] hover:bg-[#D94141] text-white font-medium shadow-xs border border-transparent",
    outline: "border border-border text-foreground hover:bg-muted bg-card font-medium shadow-2xs",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-[13px] gap-2",
    lg: "h-11 px-5 text-sm font-semibold gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
