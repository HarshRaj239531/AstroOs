"use client";

import React, { useState } from "react";
import { 
  Sparkles, Shield, Users, BarChart3, Database, Key, 
  Terminal, ArrowUpRight, Cpu, CheckCircle2, Lock, AlertTriangle 
} from "lucide-react";
import { Button, Card, Badge } from "@repo/ui";
import { MOCK_USERS, formatBytes } from "@repo/shared";

export default function AdminPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [dbStorage, setDbStorage] = useState(1284901238); // ~1.2 GB

  const toggleUserVerification = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="h-7 w-7 rounded bg-indigo-600 flex items-center justify-center">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <span>AstraOS <span className="text-xs font-semibold text-indigo-400">Admin Control</span></span>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="danger" className="font-mono text-[10px] bg-red-950/40 text-red-400 border-red-900/50">
            SYSTEM CONSOLE
          </Badge>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Platform Health Console</h1>
            <p className="text-xs text-slate-500 mt-0.5">Global configuration modules and user verification logs.</p>
          </div>
        </div>

        {/* Top Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Registrations</span>
              <h3 className="text-2xl font-bold text-white mt-1">{users.length} Users</h3>
              <span className="text-[10px] text-indigo-400">Prisma database resolved</span>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400"><Users className="h-5 w-5" /></div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">PostgreSQL Storage</span>
              <h3 className="text-2xl font-bold text-white mt-1">{formatBytes(dbStorage)}</h3>
              <span className="text-[10px] text-indigo-400">Table space allocation</span>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400"><Database className="h-5 w-5" /></div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI API Queries</span>
              <h3 className="text-2xl font-bold text-white mt-1">428 Calls</h3>
              <span className="text-[10px] text-emerald-400">Qdrant Vector DB: active</span>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400"><Cpu className="h-5 w-5" /></div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">RBAC Security Status</span>
              <h3 className="text-2xl font-bold text-white mt-1">Enforced</h3>
              <span className="text-[10px] text-emerald-400">SSL certified routes</span>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-950/40 text-indigo-400"><Shield className="h-5 w-5" /></div>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Moderation table */}
          <div className="lg:col-span-2 p-5 rounded-xl border border-slate-800 bg-slate-950">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Key className="h-4 w-4 text-indigo-400" />
              <span>User Identity Verification Log</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px] tracking-wider select-none pb-2">
                    <th className="py-2.5">User</th>
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Verification</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 font-sans font-semibold text-white">{u.firstName} {u.lastName}</td>
                      <td className="py-3 font-mono">{u.email}</td>
                      <td className="py-3">
                        <span className="flex items-center gap-1">
                          <span className={`h-2.5 w-2.5 rounded-full ${u.isVerified ? "bg-emerald-500" : "bg-red-500"}`} />
                          <span>{u.isVerified ? "VERIFIED" : "UNVERIFIED"}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Button 
                          onClick={() => toggleUserVerification(u.id)} 
                          size="sm" 
                          variant="secondary" 
                          className="h-7 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200"
                        >
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit log Console terminal */}
          <div className="lg:col-span-1 p-5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-4 font-mono">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 select-none">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <span>Security Event Stream</span>
            </h3>

            <div className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 flex flex-col gap-2 min-h-[220px]">
              <div className="text-slate-500 select-none">[v1.0.0-MVP Log Stream]</div>
              <div>[SEC-AUTH] login validation success for user harsh@example.com (IP: 127.0.0.1)</div>
              <div>[DB-CONN] connection pool initialized (Prisma version 5.0.0)</div>
              <div className="text-amber-400">[WARN-CACHE] Redis instance warning: latency spikes &gt; 50ms</div>
              <div className="text-emerald-400">[SEC-RBAC] User verifications updated successfully.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
