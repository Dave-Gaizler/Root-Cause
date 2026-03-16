"use client";

import { useState } from "react";
import { componentGroups } from "@/data/components";
import { Callout } from "@/components/callout";
import { ChevronDown, Search } from "lucide-react";

export function ComponentTaxonomy() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(componentGroups.map((g) => g.name)));
  const [search, setSearch] = useState("");

  const totalComponents = componentGroups.reduce((sum, g) => sum + g.items.length, 0);

  function toggleGroup(name: string) {
    const next = new Set(openGroups);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setOpenGroups(next);
  }

  const filtered = search.trim()
    ? componentGroups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.definition.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((g) => g.items.length > 0)
    : componentGroups;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard value={totalComponents} label="Active components" color="text-emerald-600" />
        <StatCard value={componentGroups.length} label="Prefix groups" color="text-brand-600" />
        <StatCard value={0} label="Root cause overlaps" color="text-slate-600" />
      </div>

      {/* Guidance */}
      <Callout variant="info" title="How to use components">
        Components are granular error identifiers that add specificity beyond Root Cause. Select the component(s) that describe the specific error(s) found. Try to limit to two per ticket. If no errors were found, leave the Component field empty.
        <br /><br />
        <strong>Investigation tickets</strong> use colon-prefix components (Targeting: Inventory). <strong>Campaign review tickets</strong> use dash-prefix components (ESPN - Targeting: Inventory). Only use &quot;:&quot; components for investigations.
      </Callout>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Groups */}
      <div className="space-y-3">
        {filtered.map((group) => {
          const isOpen = openGroups.has(group.name);
          return (
            <div key={group.name} className="panel overflow-hidden">
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: group.color }}
                />
                <span className="text-sm font-display font-bold text-slate-900">
                  {group.name}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  {group.items.length} component{group.items.length !== 1 ? "s" : ""}
                </span>
                <ChevronDown
                  className={`ml-auto h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 divide-y divide-slate-50">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-4 px-5 py-3 hover:bg-slate-50/40 transition-colors"
                    >
                      <div className="min-w-[220px] shrink-0">
                        <span className="text-sm font-semibold text-slate-800">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                        {item.definition}
                      </div>
                      <div className="flex flex-wrap gap-1 shrink-0">
                        {item.issueTypes.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-medium text-brand-500/80 bg-brand-50/60 border border-brand-100/60 rounded px-1.5 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rule of thumb */}
      <Callout variant="success" title="The Rule of Thumb">
        If a component just restates the root cause in different words, don&apos;t use it. If it tells you something <em>more specific</em> that would help build a targeted training, process fix, or tool improvement, it&apos;s the right component.
      </Callout>

      <p className="text-xs text-slate-400 text-center pt-4">
        AOS Components Dictionary — Universal Investigation List — March 2026
      </p>
    </div>
  );
}

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="panel p-4">
      <p className={`text-2xl font-display font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}
