"use client";

import { useState } from "react";
import { TreePine, ClipboardList, Microscope } from "lucide-react";
import { DecisionTree } from "@/components/decision-tree";
import { QuickReference } from "@/components/quick-reference";
import { ComponentTaxonomy } from "@/components/component-taxonomy";

const tabs = [
  { id: "tree", label: "Decision Tree", icon: TreePine },
  { id: "reference", label: "Quick Reference", icon: ClipboardList },
  { id: "components", label: "Universal Investigation Components", icon: Microscope },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("tree");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div>
                <span className="text-sm font-display font-bold text-slate-900">AOS Root Cause</span>
                <span className="text-xs text-slate-400 ml-2 hidden sm:inline">Investigation Tickets</span>
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all
                    ${isActive
                      ? "border-brand-500 text-brand-600"
                      : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Tab header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-2">
            AOS Investigation Tickets
          </p>
          <h1 className="text-2xl font-display font-bold text-slate-900">
            {activeTab === "tree" && "Root Cause Decision Tree"}
            {activeTab === "reference" && "Root Cause Taxonomy — Quick Reference"}
            {activeTab === "components" && "Universal Investigation Component List"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {activeTab === "tree" && "Follow the questions to identify the correct root cause for your ticket."}
            {activeTab === "reference" && "Use this guide when closing investigation tickets. Select one root cause that answers: \"What was the underlying cause of this issue?\""}
            {activeTab === "components" && "38 active components across 8 prefix groups. All components are available to all issue types."}
          </p>
        </div>

        {/* Tab panels */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === "tree" && <DecisionTree />}
          {activeTab === "reference" && <QuickReference />}
          {activeTab === "components" && <ComponentTaxonomy />}
        </div>
      </main>
    </div>
  );
}
