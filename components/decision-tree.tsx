"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { rootCauses, dispositions } from "@/data/root-causes";
import { treeSteps } from "@/data/decision-tree";
import { Callout } from "@/components/callout";

export function DecisionTree() {
  const [history, setHistory] = useState<string[]>(["start"]);
  const [result, setResult] = useState<string | null>(null);
  const [resultType, setResultType] = useState<string | null>(null);

  const currentStepId = history[history.length - 1];
  const currentStep = treeSteps.find((s) => s.id === currentStepId)!;
  const stepIndex = treeSteps.findIndex((s) => s.id === currentStepId);

  function handleOption(opt: (typeof treeSteps)[0]["options"][0]) {
    if (opt.result) {
      setResult(opt.result);
      setResultType(opt.type || "rootcause");
    } else if (opt.next) {
      setHistory([...history, opt.next]);
    }
  }

  function goBack() {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
      setResult(null);
      setResultType(null);
    }
  }

  function reset() {
    setHistory(["start"]);
    setResult(null);
    setResultType(null);
  }

  // Result screen
  if (result) {
    const isDisp = resultType === "disposition";
    const info = isDisp
      ? dispositions.find((d) => d.key === result)!
      : rootCauses.find((r) => r.key === result)!;

    return (
      <div className="space-y-6">
        <div className="panel p-8 text-center animate-fade-in">
          <div className="text-5xl mb-4">{isDisp ? (info as any).icon : (info as any).icon}</div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {isDisp ? "Ticket Disposition" : "Root Cause Identified"}
          </p>
          <h2
            className="text-2xl font-display font-bold mb-4"
            style={{ color: isDisp ? "#64748b" : (info as any).color }}
          >
            {info.label}
          </h2>

          {!isDisp && (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-lg px-4 py-2 text-sm text-amber-700 mb-6">
              <span>⚡</span>
              <span>Don&apos;t forget: Did this require TechOps escalation? (Yes / No)</span>
            </div>
          )}
          {isDisp && (
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              Set this as the JIRA Resolution value. No root cause selection needed.
            </p>
          )}

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </button>
        </div>

        <Callout variant="tip">
          <strong>Next step:</strong> Go to the <strong>Quick Reference</strong> tab to learn more about this root cause and get additional context for your investigation.
        </Callout>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {treeSteps.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i <= stepIndex ? 32 : 16,
              backgroundColor: i <= stepIndex ? "#6366f1" : "#e2e8f0",
            }}
          />
        ))}
        <span className="text-xs text-slate-400 font-mono ml-2">
          {stepIndex + 1}/{treeSteps.length}
        </span>
      </div>

      {/* Back button */}
      {history.length > 1 && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-500 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      )}

      {/* Question card */}
      <div className="panel p-6 animate-fade-in">
        <h2 className="text-lg font-display font-bold text-slate-900 mb-1">
          {currentStep.question}
        </h2>
        <p className="text-sm text-slate-500 mb-5">{currentStep.subtitle}</p>

        <div className="space-y-2">
          {currentStep.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOption(opt)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm text-slate-700 bg-slate-50/80 hover:bg-brand-50 border border-slate-200/60 hover:border-brand-200 rounded-lg transition-all group"
            >
              <span className="leading-snug">{opt.label}</span>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Instruction callout */}
      <Callout variant="tip">
        <strong>Next step:</strong> Once a root cause is identified, go to the <strong>Quick Reference</strong> tab to learn more about the root cause and get additional context.
      </Callout>

      {/* All root causes reference */}
      <div className="panel p-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          All Root Causes &amp; Dispositions
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {rootCauses.map((r) => (
            <div key={r.key} className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
              {r.label}
            </div>
          ))}
          {dispositions.map((d) => (
            <div key={d.key} className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full shrink-0 bg-slate-300" />
              {d.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
