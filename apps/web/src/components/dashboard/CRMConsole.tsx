"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "@repo/ui";

export default function CRMConsole() {
  return (
    <motion.div
      key="crm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      <Card>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Business CRM Catalog</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Manage pipeline client contacts and lead statuses.</p>
          </div>
          <Badge variant="primary" className="cursor-pointer">
            Add Customer +
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider select-none">
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Email</th>
                <th className="py-2.5">Phone</th>
                <th className="py-2.5">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
              <tr>
                <td className="py-3 font-semibold text-slate-900">Sarah Chen</td>
                <td className="py-3 font-mono">sarah@example.com</td>
                <td className="py-3 font-mono">+1 (555) 902-1233</td>
                <td className="py-3">
                  <Badge variant="success">Active</Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-900">David K.</td>
                <td className="py-3 font-mono">david@example.com</td>
                <td className="py-3 font-mono">+1 (555) 304-4902</td>
                <td className="py-3">
                  <Badge variant="warning">Lead</Badge>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-900">Alex Rivera</td>
                <td className="py-3 font-mono">alex@example.com</td>
                <td className="py-3 font-mono">+1 (555) 890-3401</td>
                <td className="py-3">
                  <Badge variant="success">Active</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
