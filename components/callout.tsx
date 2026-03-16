import { cn } from "@/lib/utils";
import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

type CalloutVariant = "info" | "tip" | "warning" | "success";

const variants: Record<CalloutVariant, { bg: string; border: string; iconColor: string; icon: React.ElementType }> = {
  info: { bg: "bg-brand-50/60", border: "border-brand-200/60", iconColor: "text-brand-500", icon: Info },
  tip: { bg: "bg-amber-50/60", border: "border-amber-200/60", iconColor: "text-amber-500", icon: Lightbulb },
  warning: { bg: "bg-rose-50/60", border: "border-rose-200/60", iconColor: "text-rose-500", icon: AlertTriangle },
  success: { bg: "bg-emerald-50/60", border: "border-emerald-200/60", iconColor: "text-emerald-500", icon: CheckCircle2 },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ variant = "info", title, children, className }: CalloutProps) {
  const v = variants[variant];
  const Icon = v.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", v.bg, v.border, className)}>
      <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", v.iconColor)} />
      <div className="min-w-0">
        {title && <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>}
        <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
