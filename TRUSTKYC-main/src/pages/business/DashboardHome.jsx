import { Link } from "react-router-dom";
import {
  FileCheck2,
  AlertTriangle,
  Handshake,
  Activity,
  FilePlus2,
  Share2,
  Upload,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { TrustGauge } from "@/components/trust-gauge";
import { StatCard, Card, SectionTitle, StatusBadge } from "@/components/ui-bits";
import { riskFlags, trustHistory, formatINR, recentActivity } from "@/data";
import { getDocuments, getDeals } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";

function severityLabel(s) {
  if (!s) return "Low";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function DashboardHome() {
  const { business } = useAuth();
  const kycDocuments = getDocuments();
  const deals = getDeals();

  const verified = kycDocuments.filter((d) => d.status === "verified").length;
  const pending = kycDocuments.filter((d) => d.status === "pending").length;
  const activeDeals = deals.filter((d) => d.status === "active").length;

  const dealTotal = deals
    .filter((d) => d.status === "active")
    .reduce((sum, d) => sum + (d.value || 0), 0);

  const scores = [
    { label: "KYC Verification", val: business?.kycScore ?? 92, max: 100, color: "bg-[#4285F4]" },
    {
      label: "Compliance Alignment",
      val: business?.complianceScore ?? 88,
      max: 100,
      color: "bg-[#22C55E]",
    },
    {
      label: "Deal Performance",
      val: business?.dealPerformanceScore ?? 85,
      max: 100,
      color: "bg-[#3B82F6]",
    },
    {
      label: "Activity Index",
      val: business?.activityScore ?? 90,
      max: 100,
      color: "bg-[#F59E0B]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enterprise Welcome Hero Banner */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="size-13 rounded-xl bg-[#DDF8FC] text-[#007B83] border border-[#BAEDF7] flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="size-6.5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-[22px] font-bold tracking-tight text-foreground font-sans">
                {business?.legalName || business?.businessName || "Acme Global Solutions Ltd"}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DDF8E8] text-[#1E824C] border border-[#C2EED4]">
                <CheckCircle2 className="size-3" /> Tier 1 Verified
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-1">
              Enterprise GSTIN:{" "}
              <span className="font-mono text-foreground font-semibold">
                {business?.gstin || "27AAACB2212M1ZV"}
              </span>{" "}
              · Continuous Monitoring Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/business/shared"
            className="btn-secondary text-xs font-semibold py-2 px-3.5 inline-flex items-center gap-1.5"
          >
            <Share2 className="size-3.5" />
            <span>Share Profile</span>
          </Link>
          <Link
            to="/business/kyc"
            className="btn-primary text-xs font-semibold py-2 px-3.5 inline-flex items-center gap-1.5"
          >
            <Upload className="size-3.5" />
            <span>Upload Document</span>
          </Link>
        </div>
      </div>

      {/* Top Grid: Trust Score & KPI Cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1 flex flex-col items-center">
          <SectionTitle
            action={
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DDF8E8] text-[#1E824C] border border-[#C2EED4]">
                Low Risk
              </span>
            }
          >
            Aggregate Trust Score
          </SectionTitle>

          <div className="my-2">
            <TrustGauge score={business?.overall ?? 88} size={200} />
          </div>

          <p className="text-[12px] text-muted-foreground text-center">
            Updated in real-time · Rating Tier:{" "}
            <span className="text-[#1E824C] dark:text-emerald-400 font-semibold">
              Grade A Enterprise
            </span>
          </p>

          <div className="w-full mt-4 space-y-2.5 pt-4 border-t border-border">
            {scores.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-mono font-semibold text-foreground">
                    {s.val} / {s.max}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#F1F3F6] dark:bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color}`}
                    style={{ width: `${(s.val / s.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/business/trust"
            className="btn-ghost w-full mt-4 text-xs font-semibold justify-center text-primary hover:text-primary"
          >
            Detailed Factor Analytics
            <ArrowUpRight className="size-3.5 ml-1" />
          </Link>
        </Card>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 sm:gap-5 content-start">
          <StatCard
            label="Compliance Documents"
            value={String(kycDocuments.length)}
            delta={`${verified} verified in ledger`}
            icon={<FileCheck2 className="size-4" />}
            accent="primary"
          />

          <StatCard
            label="Verified Records"
            value={String(verified)}
            delta={`KYC Rating ${business?.kycScore ?? 92}%`}
            icon={<ShieldCheck className="size-4" />}
            accent="success"
          />

          <StatCard
            label="Action Required"
            value={String(pending)}
            delta={`Compliance Index ${business?.complianceScore ?? 88}%`}
            icon={<Activity className="size-4" />}
            accent="warning"
          />

          <StatCard
            label="Active Deal Pipeline"
            value={String(activeDeals)}
            delta={`${formatINR(dealTotal)} active exposure`}
            icon={<Handshake className="size-4" />}
            accent="pink"
          />

          {/* Quick Notice Card in Grid */}
          <div className="sm:col-span-2 rounded-xl border border-border bg-[#F7F8FA] dark:bg-muted/30 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-[#DDF8FC] text-[#007B83] border border-[#BAEDF7] flex items-center justify-center shrink-0">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  Continuous Sanction & AML Screening
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Automated daily scans against OFAC, FATF, and RBI monitor lists.
                </p>
              </div>
            </div>
            <Link
              to="/business/audit"
              className="text-xs font-semibold text-primary hover:underline shrink-0 flex items-center gap-1"
            >
              Audit Logs <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Charts & Risk Flags */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle
            action={
              <span className="text-[11px] text-muted-foreground font-mono">
                Past 12 Months Trajectory
              </span>
            }
          >
            Trust Stability Index
          </SectionTitle>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trustHistory}>
                <defs>
                  <linearGradient id="trustScoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EBEF" opacity={0.8} />
                <XAxis
                  dataKey="month"
                  stroke="#7A8492"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 100]}
                  stroke="#7A8492"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #E8EBEF",
                    borderRadius: 10,
                    fontSize: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    color: "#263445",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#4285F4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#trustScoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle
            action={
              <span className="text-[11px] font-mono text-muted-foreground">
                {riskFlags.length} Flags
              </span>
            }
          >
            Risk & Alert Registry
          </SectionTitle>

          <div className="space-y-2.5 mt-1">
            {riskFlags.map((f) => (
              <div
                key={f.id}
                className="p-3 rounded-lg border border-border bg-[#F7F8FA] dark:bg-muted/20 flex gap-3 transition-colors hover:border-[#D1D7E0]"
              >
                <AlertTriangle
                  className={`size-4 mt-0.5 shrink-0 ${
                    f.severity === "high" ? "text-[#D32F2F]" : "text-[#B45309]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold text-foreground truncate">{f.title}</p>
                    <StatusBadge status={severityLabel(f.severity)} />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle
            action={
              <Link
                to="/business/audit"
                className="text-xs text-primary hover:underline font-medium"
              >
                Full Audit Trail
              </Link>
            }
          >
            Recent System Activity
          </SectionTitle>

          <div className="divide-y divide-border">
            {recentActivity.map((a) => (
              <div key={a.id} className="py-3 flex items-center gap-3 text-[13px]">
                <span className="size-2 rounded-full bg-[#4285F4] shrink-0" />
                <span className="flex-1 font-medium text-foreground">{a.text}</span>
                <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Enterprise Actions</SectionTitle>

          <div className="space-y-2.5 mt-1">
            <Link
              to="/business/kyc"
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-[#F7F8FA] dark:hover:bg-muted/60 transition-colors group"
            >
              <div className="size-8.5 rounded-lg bg-[#DDF8FC] text-[#007B83] border border-[#BAEDF7] flex items-center justify-center shrink-0">
                <Upload className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                  Upload Compliance Document
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Deposit GST, PAN or bank statements
                </p>
              </div>
            </Link>

            <Link
              to="/business/deals"
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-[#F7F8FA] dark:hover:bg-muted/60 transition-colors group"
            >
              <div className="size-8.5 rounded-lg bg-[#DDF8E8] text-[#1E824C] border border-[#C2EED4] flex items-center justify-center shrink-0">
                <FilePlus2 className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                  Initiate Commercial Deal
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Create trade contracts with counterparties
                </p>
              </div>
            </Link>

            <Link
              to="/business/directory"
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-[#F7F8FA] dark:hover:bg-muted/60 transition-colors group"
            >
              <div className="size-8.5 rounded-lg bg-[#FFF1C7] text-[#B45309] border border-[#FCE19C] flex items-center justify-center shrink-0">
                <Building2 className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                  Counterparty Directory
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Discover verified Indian businesses
                </p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
