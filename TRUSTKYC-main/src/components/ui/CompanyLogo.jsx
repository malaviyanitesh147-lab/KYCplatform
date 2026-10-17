import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompanyLogo({ size = "md", to, className = "" }) {
  const isLg = size === "lg";
  const isSm = size === "sm";

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div
        className={`relative ${
          isLg ? "size-10 rounded-xl" : isSm ? "size-7 rounded-lg" : "size-9 rounded-lg"
        } bg-[#4285F4] flex items-center justify-center shadow-xs text-white shrink-0 transition-transform group-hover:scale-105`}
      >
        <ShieldCheck className={isLg ? "size-5" : isSm ? "size-3.5" : "size-4.5"} />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 ring-2 ring-sidebar" />
      </div>
      <div className="leading-tight">
        <div
          className={`font-bold tracking-tight text-foreground ${
            isLg ? "text-xl" : isSm ? "text-sm" : "text-[16px]"
          }`}
        >
          Trust<span className="text-[#4285F4]">KYC</span>
        </div>
        {!isSm && (
          <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Identity Platform
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
}

export { CompanyLogo };
