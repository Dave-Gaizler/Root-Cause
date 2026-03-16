import { rootCauses, dispositions } from "@/data/root-causes";
import { Callout } from "@/components/callout";
import { Zap, AlertCircle, CheckCircle, Eye, Lightbulb } from "lucide-react";

export function QuickReference() {
  return (
    <div className="space-y-8">
      {/* Guidance note */}
      <Callout variant="info" title="You've identified a root cause">
        Now use the information below to learn more about the issue your campaign is facing and confirm your selection is correct.
      </Callout>

      {/* Decision Flow */}
      <section>
        <SectionHeading number={1} title="Decision Flow" />
        <div className="space-y-2">
          <FlowRow
            items={["Was it resolved with a diagnosis?", "No → use JIRA Resolution (Duplicate / Cannot Reproduce / Cancelled)"]}
          />
          <FlowRow
            items={["Yes, resolved", "External cause?", "Media Partner / Client-Vendor / Operative"]}
          />
          <FlowRow
            items={["Internal cause", "Was there a real issue?", "No → Expected Behavior"]}
          />
        </div>
      </section>

      {/* Root Cause Cards */}
      <section>
        <SectionHeading number={2} title="Root Cause Categories" subtitle="Select one when Resolution = Done" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rootCauses.map((rc) => (
            <div key={rc.key} className="panel p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: rc.color }}
                />
                <h3 className="text-sm font-semibold" style={{ color: rc.color }}>
                  {rc.label}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">{rc.definition}</p>
              <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-2">
                {rc.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TechOps */}
      <section>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-bold text-amber-800">Escalated to TechOps</h3>
          </div>
          <p className="text-sm text-amber-700/80 leading-relaxed">
            Separate field (Yes / No) — always fill this out alongside Root Cause. Select <strong>Yes</strong> when a dev ticket was created, TechOps deployed a backend fix, or engineering collaboration was required. This tracks dev fix volume independently so you can cross-reference it against root causes.
          </p>
        </div>
      </section>

      {/* JIRA Resolution Values */}
      <section>
        <SectionHeading number={3} title="JIRA Resolution Values" subtitle="No root cause needed" />
        <div className="panel divide-y divide-slate-100">
          {dispositions.map((d) => (
            <div key={d.key} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                {d.label}
              </span>
              <span className="text-sm text-slate-600">{d.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key Reminders */}
      <section>
        <SectionHeading number={4} title="Key Reminders" />
        <div className="panel divide-y divide-slate-100">
          <Reminder icon={AlertCircle} color="text-brand-500" label="Rule">
            Confirm issue is resolved with the AM before closing. Client-facing responses determined by SROS or Ad Ops Manager.
          </Reminder>
          <Reminder icon={AlertCircle} color="text-brand-500" label="Rule">
            Populate Components from the AOS Components Dictionary. Do not use ESPN, Hulu, or D+ prefixed components (review tickets only).
          </Reminder>
          <Reminder icon={AlertCircle} color="text-brand-500" label="Rule">
            Review your ticket title: Ad Server (MC/GAM) - Category - Issue Summary (5-10 words).
          </Reminder>
          <Reminder icon={Eye} color="text-amber-500" label="Watch">
            If any root cause consistently exceeds 30-35% of tickets, it may need splitting. Flag to the team.
          </Reminder>
          <Reminder icon={Lightbulb} color="text-emerald-500" label="Tip">
            If unsure between two root causes, pick the closest match and add a comment explaining why. No "Other" option exists.
          </Reminder>
        </div>
      </section>

      <p className="text-xs text-slate-400 text-center pt-4">
        AOS Investigation Tickets — Root Cause Taxonomy v2.0 — March 2026
      </p>
    </div>
  );
}

function SectionHeading({ number, title, subtitle }: { number: number; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-500 text-white text-xs font-bold shrink-0">
        {number}
      </span>
      <div>
        <h2 className="text-base font-display font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function FlowRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="text-brand-400 font-bold text-sm">→</span>}
          <span className="text-xs font-medium text-slate-600 bg-slate-100/80 border border-slate-200/60 rounded-lg px-3 py-2">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function Reminder({ icon: Icon, color, label, children }: { icon: React.ElementType; color: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 ${
        label === "Rule" ? "bg-brand-50 text-brand-600" :
        label === "Watch" ? "bg-amber-50 text-amber-600" :
        "bg-emerald-50 text-emerald-600"
      }`}>
        {label}
      </span>
      <span className="text-sm text-slate-600 leading-relaxed">{children}</span>
    </div>
  );
}
