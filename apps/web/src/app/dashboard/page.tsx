"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, MessageSquare, Calendar, FileText, CheckCircle2,
  Users, Video, Database, BarChart3, Receipt, Package, Terminal,
  Layers, Star, Lock, Moon, Sun, ArrowRightLeft, Bot, Search,
  Settings, LogOut, Send, Plus, Bell, Clock, Activity, Cpu, AlertTriangle, Menu, X, ArrowUpRight, PlusCircle
} from "lucide-react";
import { Button, Card, Badge, Input } from "@repo/ui";
import { useAstraStore } from "@/store";
import { TaskStatus } from "@repo/types";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentUser,
    activeTab,
    setActiveTab,
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    addWorkspace,
    messages,
    addMessage,
    tasks,
    addTask,
    updateTaskStatus,
    notifications,
    addNotification,
    markNotificationsRead
  } = useAstraStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Modal Workspace State
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsDesc, setNewWsDesc] = useState("");

  const handleLogOut = () => {
    router.push("/");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser) return;
    addMessage(chatInput, currentUser.id);
    setChatInput("");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    addTask(taskInput, "Task description generated from dashboard console.", "usr-2");
    setTaskInput("");
  };

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

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    addWorkspace(newWsName, newWsDesc);
    setNewWsName("");
    setNewWsDesc("");
    setShowWorkspaceModal(false);
    addNotification("Workspace Created", `Successfully initialized workspace: ${newWsName}`);
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
                  className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
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
            {/* Home Console view */}
            {activeTab === "home" && (
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
            )}

            {/* Chat View */}
            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-[calc(100vh-12rem)] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">#development</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Coordinate system layouts and monorepo shared dependencies.</p>
                  </div>
                  <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-indigo-500" /> <span className="text-xs font-bold text-slate-700">3 active</span></div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                  {messages.map((msg) => {
                    const isOwn = msg.senderId === currentUser?.id;
                    const name = isOwn ? "Harsh Raj" : msg.senderId === "usr-2" ? "Sarah Chen" : "Alex Rivera";
                    const avatar = isOwn ? currentUser?.avatar : msg.senderId === "usr-2" ? "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" : "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex";

                    return (
                      <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isOwn ? "self-end flex-row-reverse text-right" : "self-start"}`}>
                        <img src={avatar} alt={name} className="h-8 w-8 rounded-full border shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-800">{name}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className={`mt-1.5 p-3 rounded-lg text-xs leading-relaxed ${isOwn ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-100 text-slate-700 rounded-tl-none"}`}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2 shrink-0">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message inside #development..."
                    className="flex-1 px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                  />
                  <Button type="submit" size="sm" className="flex items-center gap-1">
                    <span>Send</span>
                    <Send className="h-3 w-3" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Tasks Board View */}
            {activeTab === "tasks" && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                {/* Header with form */}
                <Card className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Workspace Task Manager</h3>
                    <p className="text-xs text-slate-400 mt-1">Directly inject tasks into your monorepo development sprint.</p>
                  </div>
                  <form onSubmit={handleAddTask} className="flex gap-2 shrink-0 w-96">
                    <input
                      type="text"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="Add another card task..."
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 bg-white"
                    />
                    <Button type="submit" size="sm">Create Task</Button>
                  </form>
                </Card>

                {/* Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* TODO Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">TODO</span>
                      <Badge variant="secondary">{tasks.filter(t => t.status === TaskStatus.TODO).length}</Badge>
                    </div>
                    {tasks.filter(t => t.status === TaskStatus.TODO).map(task => (
                      <Card key={task.id} className="bg-white flex flex-col gap-3 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="text-[9px] font-mono text-slate-400">Assigned: Sarah Chen</span>
                          <Button size="sm" variant="ghost" onClick={() => updateTaskStatus(task.id, TaskStatus.IN_PROGRESS)} className="text-[9px] h-7 px-2">
                            Start Progress &rarr;
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* IN PROGRESS Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">IN PROGRESS</span>
                      <Badge variant="primary">{tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length}</Badge>
                    </div>
                    {tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).map(task => (
                      <Card key={task.id} className="bg-white border-indigo-100 flex flex-col gap-3 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="text-[9px] font-mono text-slate-400">Assigned: Harsh Raj</span>
                          <Button size="sm" variant="ghost" onClick={() => updateTaskStatus(task.id, TaskStatus.DONE)} className="text-[9px] h-7 px-2 text-emerald-600">
                            Done &rarr;
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* DONE Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">DONE</span>
                      <Badge variant="success">{tasks.filter(t => t.status === TaskStatus.DONE).length}</Badge>
                    </div>
                    {tasks.filter(t => t.status === TaskStatus.DONE).map(task => (
                      <Card key={task.id} className="bg-slate-50/50 opacity-70 flex flex-col gap-3 shadow-none border-dashed">
                        <h4 className="text-xs font-bold text-slate-800 line-through">{task.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="text-[9px] font-mono text-slate-400">Completed</span>
                          <Badge variant="success" className="text-[8px]">RESOLVED</Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Assistant View */}
            {activeTab === "ai" && (
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
                        <Badge variant="primary" className="text-[8px] bg-indigo-500/20 text-indigo-300 border-indigo-500/30">AI Active</Badge>
                      </div>
                      <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-indigo-200">
                        {isAiLoading ? (
                          <div className="flex items-center gap-2 mt-4 animate-pulse text-slate-500">
                            <svg className="animate-spin h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Synthesizing vector references from Qdrant...</span>
                          </div>
                        ) : aiResponse ? (
                          <pre className="whitespace-pre-wrap">{aiResponse}</pre>
                        ) : (
                          <span className="text-slate-600 italic">No instructions queried. Try selecting a template or typing a prompt in the left sidebar dashboard panel.</span>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CRM Pipeline */}
            {activeTab === "crm" && (
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
                    <Badge variant="primary" className="cursor-pointer">Add Customer +</Badge>
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
                          <td className="py-3"><Badge variant="success">Active</Badge></td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-slate-900">David K.</td>
                          <td className="py-3 font-mono">david@example.com</td>
                          <td className="py-3 font-mono">+1 (555) 304-4902</td>
                          <td className="py-3"><Badge variant="warning">Lead</Badge></td>
                        </tr>
                        <tr>
                          <td className="py-3 font-semibold text-slate-900">Alex Rivera</td>
                          <td className="py-3 font-mono">alex@example.com</td>
                          <td className="py-3 font-mono">+1 (555) 890-3401</td>
                          <td className="py-3"><Badge variant="success">Active</Badge></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Billing */}
            {activeTab === "billing" && (
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
                    <Button size="sm" variant="outline">Export CSV</Button>
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
                          <td className="py-3"><Badge variant="success">PAID</Badge></td>
                          <td className="py-3 text-slate-400 font-mono text-[10px]">{new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold">INV-1093</td>
                          <td className="py-3">$1,200.00</td>
                          <td className="py-3"><Badge variant="warning">PENDING</Badge></td>
                          <td className="py-3 text-slate-400 font-mono text-[10px]">{new Date().toLocaleDateString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* System config / settings */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <Card className="max-w-2xl">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Workspace Custom Configurations</h3>
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
                      <Button variant="outline" size="sm">Revoke All</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
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
