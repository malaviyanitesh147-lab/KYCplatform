import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Award,
  Handshake,
  Building2,
  Share2,
  FileSpreadsheet,
  Settings,
  Scale,
  LogOut,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  User,
} from "lucide-react";
import CompanyLogo from "../ui/CompanyLogo";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/utils";

const businessNav = [
  { name: "Dashboard", href: "/business/dashboard", icon: LayoutDashboard },
  { name: "KYC Verification", href: "/business/kyc", icon: ShieldCheck },
  { name: "Documents", href: "/business/documents", icon: FileText },
  { name: "Trust Score", href: "/business/trust", icon: Award },
  { name: "My Deals", href: "/business/deals", icon: Handshake },
  { name: "Directory", href: "/business/directory", icon: Building2 },
  { name: "Shared Profiles", href: "/business/shared", icon: Share2 },
  { name: "Audit Logs", href: "/business/audit", icon: FileSpreadsheet },
  { name: "Settings", href: "/business/settings", icon: Settings },
];

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Businesses", href: "/admin/businesses", icon: Building2 },
  { name: "KYC Reviews", href: "/admin/kyc", icon: ShieldCheck },
  { name: "Documents", href: "/admin/documents", icon: FileText },
  { name: "Deals & Disputes", href: "/admin/deals", icon: Scale },
  { name: "Audit Ledger", href: "/admin/audit", icon: FileSpreadsheet },
  { name: "User Roles", href: "/admin/users", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AppSidebar({ kind = "business", onLinkClick }) {
  const { user, business, logout } = useAuth();
  const navItems = kind === "admin" ? adminNav : businessNav;

  const displayName = user?.name || (kind === "admin" ? "Smit Patel" : "Krish Lad");
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border select-none">
      {/* Brand Header (68px aligned with topbar) */}
      <div className="h-[68px] px-5 border-b border-sidebar-border flex items-center justify-between shrink-0">
        <CompanyLogo size="md" to={kind === "admin" ? "/admin/dashboard" : "/business/dashboard"} />
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F1F5FD] dark:bg-muted text-primary border border-border">
          {kind === "admin" ? "Admin" : "Business"}
        </span>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
          {kind === "admin" ? "Compliance Operations" : "Enterprise Workspace"}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onLinkClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all group",
                  isActive
                    ? "bg-[#4285F4] text-white shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#F1F5FD] dark:hover:bg-muted/70",
                )
              }
            >
              <Icon className="size-4 shrink-0 transition-transform group-hover:scale-105" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        {/* In-App Documentation Link */}
        <div className="pt-4 mt-3 border-t border-sidebar-border">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
            Resources
          </div>
          <NavLink
            to="/documentation"
            onClick={onLinkClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all group",
                isActive
                  ? "bg-[#4285F4] text-white shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-[#F1F5FD] dark:hover:bg-muted/70",
              )
            }
          >
            <BookOpen className="size-4 shrink-0 text-primary" />
            <span>Documentation</span>
          </NavLink>
        </div>
      </div>

      {/* User Footer Card */}
      <div className="p-3.5 border-t border-sidebar-border bg-[#F7F8FA] dark:bg-muted/20 shrink-0">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="size-9 rounded-full bg-[#DDF8FC] dark:bg-primary/20 text-[#007B83] dark:text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 border border-[#BAEDF7] dark:border-primary/30">
            {userInitials || <User className="size-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-foreground truncate leading-tight">
              {displayName}
            </div>
            <div className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">
              {kind === "admin"
                ? "Compliance Officer"
                : business?.name || "Helios Trade Networks"}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-border bg-card text-[12px] font-medium text-muted-foreground hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-all cursor-pointer shadow-2xs"
        >
          <LogOut className="size-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default AppSidebar;
