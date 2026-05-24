"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Card } from "@repo/ui";

export default function SettingsConsole() {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      <Card className="max-w-2xl">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
          Workspace Custom Configurations
        </h3>
        <div className="flex flex-col gap-4 text-xs text-slate-700">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-slate-900">Language preferences</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Choose your default text localization setting.</p>
            </div>
            <span className="font-mono bg-slate-100 px-2.5 py-1 rounded">English (US)</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-slate-900">Notifications dispatch settings</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Toggle instant dispatch emails for task completions.</p>
            </div>
            <span className="text-emerald-500 font-semibold uppercase">ACTIVE</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">Security Access tokens</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Re-verify active session tokens inside cookies.</p>
            </div>
            <Button variant="outline" size="sm">
              Revoke All
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
