"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Card, Badge } from "@repo/ui";

export default function BillingConsole() {
  return (
    <motion.div
      key="billing"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Invoice metrics */}
        <Card className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Invoiced</span>
          <h4 className="text-2xl font-bold text-slate-900">$5,700.00</h4>
          <span className="text-[10px] text-slate-400">Across 2 active accounts</span>
        </Card>
        <Card className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Paid Amount</span>
          <h4 className="text-2xl font-bold text-slate-900">$4,500.00</h4>
          <span className="text-[10px] text-emerald-500 font-semibold">100% reconciliation rate</span>
        </Card>
        <Card className="flex flex-col gap-1.5 md:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending Amount</span>
          <h4 className="text-2xl font-bold text-slate-900">$1,200.00</h4>
          <span className="text-[10px] text-amber-500 font-semibold">Due in 5 days</span>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tax & Invoice Registry</h4>
          <Button size="sm" variant="outline">
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider select-none">
                <th className="py-2.5">Invoice ID</th>
                <th className="py-2.5">Total Amount</th>
                <th className="py-2.5">Billing Status</th>
                <th className="py-2.5">Audit Stamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 font-bold">INV-1092</td>
                <td className="py-3">$4,500.00</td>
                <td className="py-3">
                  <Badge variant="success">PAID</Badge>
                </td>
                <td className="py-3 text-slate-400 font-mono text-[10px]">{new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="py-3 font-bold">INV-1093</td>
                <td className="py-3">$1,200.00</td>
                <td className="py-3">
                  <Badge variant="warning">PENDING</Badge>
                </td>
                <td className="py-3 text-slate-400 font-mono text-[10px]">{new Date().toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
