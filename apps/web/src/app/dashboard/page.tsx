"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, MessageSquare, Layers, CheckCircle2, Bot, Users, Receipt, Settings, LogOut, Plus, Bell, Menu, X
} from "lucide-react";
import { Button, Badge, Input } from "@repo/ui";
import { useAstraStore } from "@/store";

import HomeConsole from "@/components/dashboard/HomeConsole";
import ChatConsole from "@/components/dashboard/ChatConsole";
import TaskBoard from "@/components/dashboard/TaskBoard";
import AIConsole from "@/components/dashboard/AIConsole";
import CRMConsole from "@/components/dashboard/CRMConsole";
import BillingConsole from "@/components/dashboard/BillingConsole";
import SettingsConsole from "@/components/dashboard/SettingsConsole";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    activeTab,
    setActiveTab,
    activeWorkspace,
    addWorkspace,
    notifications,
    markNotificationsRead
  } = useAstraStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal Workspace State
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsDesc, setNewWsDesc] = useState("");

  const handleLogOut = () => {
    router.push("/");
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    addWorkspace(newWsName, newWsDesc);
    setNewWsName("");
    setNewWsDesc("");
    setShowWorkspaceModal(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar navigation */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 280 : 72 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between overflow-hidden shadow-sm"
      >
        <div className="flex flex-col gap-6 p-4">
          {/* Logo / Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2 font-bold text-lg text-slate-900 select-none">
                <div className="h-7 w-7 rounded bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <span>AstraOS</span>
              </div>
            ) : (
              <div className="h-7 w-7 rounded bg-indigo-600 flex items-center justify-center text-white mx-auto cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                <Sparkles className="h-4 w-4" />
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Active Workspace Selector */}
          {isSidebarOpen ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Workspace</span>
                <span className="text-xs font-bold text-slate-800">{activeWorkspace?.name}</span>
              </div>
              <button onClick={() => setShowWorkspaceModal(true)} className="p-1 rounded hover:bg-slate-200 text-slate-500">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="h-8 w-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto cursor-pointer" onClick={() => setShowWorkspaceModal(true)}>
              <Plus className="h-4 w-4 text-slate-600" />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {[
              { id: "home", label: "Home Console", icon: Layers },
              { id: "chat", label: "Chat Messaging", icon: MessageSquare },
              { id: "tasks", label: "Tasks & Board", icon: CheckCircle2 },
              { id: "ai", label: "AI Assistant", icon: Bot },
              { id: "crm", label: "CRM Pipeline", icon: Users },
              { id: "billing", label: "Billing & Invoices", icon: Receipt },
              { id: "settings", label: "System Config", icon: Settings }
            ].map((link) => {
              const Icon = link.icon;
              const active = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${active
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {isSidebarOpen && <span>{link.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card footer */}
        <div className="p-4 border-t border-slate-100">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={currentUser?.avatar} alt={currentUser?.username} className="h-8 w-8 rounded-full border border-indigo-100" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{currentUser?.firstName} {currentUser?.lastName}</span>
                  <span className="text-[9px] text-slate-400 font-mono">Status: ONLINE</span>
                </div>
              </div>
              <button onClick={handleLogOut} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Sign Out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleLogOut} className="h-8 w-8 rounded bg-red-50 flex items-center justify-center text-red-500 mx-auto" title="Sign Out">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Panel content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-1 rounded hover:bg-slate-100 text-slate-500">
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-sm font-bold text-slate-800 capitalize">{activeTab} Console</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative cursor-pointer" onClick={markNotificationsRead}>
              <div className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <Bell className="h-4.5 w-4.5" />
              </div>
              {notifications.some(n => !n.isRead) && (
                <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-rose-500 border border-white" />
              )}
            </div>

            <Badge variant="primary" className="font-mono text-[10px]">
              v1.0.0-MVP
            </Badge>
          </div>
        </header>

        {/* Content View Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === "home" && <HomeConsole />}
            {activeTab === "chat" && <ChatConsole />}
            {activeTab === "tasks" && <TaskBoard />}
            {activeTab === "ai" && <AIConsole />}
            {activeTab === "crm" && <CRMConsole />}
            {activeTab === "billing" && <BillingConsole />}
            {activeTab === "settings" && <SettingsConsole />}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal Dialog for workspace addition */}
      <AnimatePresence>
        {showWorkspaceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm">Create New Workspace</h3>
                <button onClick={() => setShowWorkspaceModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateWorkspace} className="flex flex-col gap-4">
                <Input
                  label="Workspace Name"
                  placeholder="Marketing Team, Design Lab"
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Description</label>
                  <textarea
                    placeholder="Brief objective of this workspace..."
                    value={newWsDesc}
                    onChange={(e) => setNewWsDesc(e.target.value)}
                    className="p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 bg-white min-h-[80px]"
                  />
                </div>

                <div className="flex gap-2 justify-end border-t border-slate-100 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowWorkspaceModal(false)} size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Create Workspace
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
