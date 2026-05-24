"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Button, Card, Badge } from "@repo/ui";
import { useAstraStore } from "@/store";
import { TaskStatus } from "@repo/types";

export default function AIConsole() {
  const { tasks, addNotification } = useAstraStore();
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const triggerAiQuery = () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse(
        `[Gemini OS Intelligence Agent]\n` +
        `Based on workspace files and recent notifications:\n` +
        `- Sarah Chen is currently ONLINE. Her last message is regarding Flutter configs.\n` +
        `- There are currently ${tasks.filter(t => t.status === TaskStatus.TODO).length} tasks in TODO and ${tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length} in IN_PROGRESS.\n` +
        `- Recommendation: Execute standard build verification tests before merging fix/login-bug.`
      );
      addNotification("AI Assistant Recommendation", "New system verification suggestions are available in the console.");
    }, 1500);
  };

  return (
    <motion.div
      key="ai"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column prompt and settings */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">OS Intelligent Sandbox</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Input Query Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Draft code schemas or ask for summaries..."
                  className="p-3 text-xs border border-slate-200 rounded-lg min-h-[100px] focus:outline-none focus:border-indigo-600 bg-white"
                />
              </div>
              <Button onClick={triggerAiQuery} isLoading={isAiLoading} className="w-full">
                Query Gemini Core
              </Button>
            </div>
          </Card>

          <Card>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Prompt Templates</h4>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setAiPrompt("Summarize all pending TODO tasks in standard markdown formatting.")}
                className="p-2 text-left text-[11px] rounded border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Summarize TODO tasks
              </button>
              <button
                onClick={() => setAiPrompt("Verify standard build workflows in tech-stack.md file.")}
                className="p-2 text-left text-[11px] rounded border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Check tech-stack files
              </button>
            </div>
          </Card>
        </div>

        {/* Output Terminal mockup */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800 text-slate-300 font-mono h-full flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 select-none">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Terminal className="h-4.5 w-4.5" />
                <span>Gemini OS Intelligence Output</span>
              </div>
              <Badge
                variant="primary"
                className="text-[8px] bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
              >
                AI Active
              </Badge>
            </div>
            <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-indigo-200">
              {isAiLoading ? (
                <div className="flex items-center gap-2 mt-4 animate-pulse text-slate-500">
                  <svg className="animate-spin h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Synthesizing vector references from Qdrant...</span>
                </div>
              ) : aiResponse ? (
                <pre className="whitespace-pre-wrap">{aiResponse}</pre>
              ) : (
                <span className="text-slate-600 italic">
                  No instructions queried. Try selecting a template or typing a prompt in the left sidebar dashboard
                  panel.
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
