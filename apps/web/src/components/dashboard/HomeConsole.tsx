"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Cpu, Users, CheckCircle2, Bot, Clock, Sparkles
} from "lucide-react";
import { Button, Card, Badge } from "@repo/ui";
import { useAstraStore } from "@/store";
import { TaskStatus } from "@repo/types";

export default function HomeConsole() {
  const {
    currentUser,
    setActiveTab,
    tasks,
    notifications,
  } = useAstraStore();

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-6"
    >
      {/* Greetings */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl p-6 shadow-md shadow-indigo-600/10">
        <h3 className="text-xl font-bold">Hello, {currentUser?.firstName}!</h3>
        <p className="text-xs text-indigo-100 mt-1 max-w-xl">
          Welcome to your unified workspace. Your background LLM pipelines are fully operational.
        </p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Workspace Revenue</span>
            <h4 className="text-lg font-bold text-slate-900 mt-1">$14,820.00</h4>
            <span className="text-[10px] text-emerald-500 font-semibold">+18.5% this week</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600"><BarChart3 className="h-5 w-5" /></div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gateway Latency</span>
            <h4 className="text-lg font-bold text-slate-900 mt-1">42ms</h4>
            <span className="text-[10px] text-indigo-500 font-semibold">Qdrant query active</span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600"><Cpu className="h-5 w-5" /></div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Team Presence</span>
            <h4 className="text-lg font-bold text-slate-900 mt-1">4 Active</h4>
            <span className="text-[10px] text-indigo-500 font-semibold">Socket.IO listening</span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600"><Users className="h-5 w-5" /></div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Open Tasks</span>
            <h4 className="text-lg font-bold text-slate-900 mt-1">{tasks.filter(t => t.status !== TaskStatus.DONE).length} Tasks</h4>
            <span className="text-[10px] text-rose-500 font-semibold">2 overdue cards</span>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600"><CheckCircle2 className="h-5 w-5" /></div>
        </Card>
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left columns: AI Insights + Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* AI Insights Card */}
          <Card className="border-indigo-100 bg-indigo-50/30">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-indigo-600" />
              <h4 className="font-bold text-sm text-indigo-900">AI OS Assistant Insights</h4>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              I compiled your workspace updates. Sarah Chen requested verification of the mobile pubspec dependencies. Would you like me to run check validation scripts?
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => setActiveTab("ai")}>Ask AI Assistant</Button>
              <Button variant="outline" size="sm" className="bg-white">Dismiss</Button>
            </div>
          </Card>

          {/* Recent Notifications Feed */}
          <Card>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-4">Workspace Notifications</h4>
            <div className="flex flex-col gap-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="p-2 rounded bg-slate-50 text-slate-600 shrink-0"><Clock className="h-4 w-4" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-slate-900">{n.title}</h5>
                      {!n.isRead && <Badge variant="primary" className="text-[8px]">New</Badge>}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Presence + Tasks List */}
        <div className="flex flex-col gap-6">
          {/* Team Presence */}
          <Card>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-4">Team Presence</h4>
            <div className="flex flex-col gap-3">
              {[
                { name: "Sarah Chen", role: "Product Lead", status: "ONLINE", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" },
                { name: "Harsh Raj", role: "Developer (You)", status: "ONLINE", avatar: currentUser?.avatar },
                { name: "Alex Rivera", role: "CTO", status: "ONLINE", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" },
                { name: "David K.", role: "Designer", status: "AWAY", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=David" }
              ].map((member, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full border border-indigo-50" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{member.name}</span>
                      <span className="text-[9px] text-slate-400">{member.role}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${member.status === "ONLINE" ? "bg-emerald-500" : "bg-amber-400"}`} />
                    <span className="text-[9px] font-mono text-slate-400">{member.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-4">Upcoming Tasks</h4>
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{task.title}</h5>
                    <span className="text-[9px] text-slate-400 font-mono">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant={task.status === TaskStatus.DONE ? "success" : "warning"} className="text-[8px]">
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
