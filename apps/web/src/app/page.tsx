"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Sparkles, MessageSquare, Briefcase, Code, Cpu, Shield, 
  FolderGit2, Calendar, FileText, CheckCircle2, ChevronRight, Play, 
  Users, Video, Database, BarChart3, Receipt, Package, Terminal, 
  Layers, Star, Lock, Moon, Sun, ArrowRightLeft, Bot, Search
} from "lucide-react";
import { Button, Card, Badge } from "@repo/ui";

export default function LandingPage() {
  const [activeFeatureTab, setActiveFeatureTab] = useState<"ai" | "comm" | "prod" | "business" | "dev">("ai");
  const [promptInput, setPromptInput] = useState("Draft an onboarding task list for Sarah Chen");
  const [aiOutput, setAiOutput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiTrigger = () => {
    if (!promptInput.trim()) return;
    setIsAiLoading(true);
    setAiOutput("");
    setTimeout(() => {
      setIsAiLoading(false);
      setAiOutput(
        `- **Task 1**: Review the system architecture guidelines [architecture.md] (Assign to: Sarah Chen)\n` +
        `- **Task 2**: Establish API endpoints testing workflow using local Postman collections\n` +
        `- **Task 3**: Create first dashboard UI screen using '@repo/ui' Button and Input tokens\n\n` +
        `*Suggested Action: Instantly populate to clickup workspace? [Yes/No]*`
      );
    }, 1200);
  };

  const featureCards = [
    {
      title: "Real-Time Communication",
      desc: "Instant direct messages, nested threads, reactions, and HD calling built into your daily operations.",
      icon: MessageSquare,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "AI-First Assistant",
      desc: "Context-aware LLM agents that summarize code, draft invoices, build roadmaps, and automate tasks.",
      icon: Cpu,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
    {
      title: "Flexible Workspaces",
      desc: "Organize projects, channels, permissions, and billing on an individual, team, or enterprise scale.",
      icon: Layers,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Smart Files & Assets",
      desc: "S3 compatible storage with signed credentials, image optimizations, and lightning-fast search indexing.",
      icon: Database,
      color: "text-pink-600 bg-pink-50 border-pink-100",
    },
    {
      title: "Tasks & Projects",
      desc: "Drag-and-drop task status trackers, priority tags, and shared calendar scheduler alerts.",
      icon: Calendar,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      title: "Business Suite CRM",
      desc: "Unified customer management, stock catalogs, billing reports, and custom invoice generators.",
      icon: BarChart3,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Developer Platform",
      desc: "Git repository webhooks, automated API swagger generation, and sandbox testing environments.",
      icon: Code,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Autonomous Agents",
      desc: "Deploy background researchers, auto-coders, and digital assistants executing scheduled cron pipelines.",
      icon: Bot,
      color: "text-sky-600 bg-sky-50 border-sky-100",
    },
  ];

  const testimonials = [
    {
      quote: "AstraOS has replaced Slack, Jira, and Google Docs for our entire engineering group. Having AI agents directly in our chat rooms saving notes is absolute magic.",
      author: "Alex Rivera",
      role: "CTO, CloudScale Inc.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
    },
    {
      quote: "We consolidated our CRM, billing, and developer document hubs into AstraOS. The productivity gain from having one unified identity was noticeable in week one.",
      author: "Sarah Chen",
      role: "Product Lead, Vercel Hub",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah",
    },
    {
      quote: "The developer platform workspace is incredibly advanced. Writing types in `@repo/types` and immediately pulling them into our client screens has changed our speed of delivery.",
      author: "Harsh Raj",
      role: "Founder, AstroOS Labs",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Harsh",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header / Navigation bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            <span>Astra<span className="text-indigo-600">OS</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#demo" className="hover:text-slate-900 transition-colors">AI Assistant</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Reviews</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Launch App</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Introducing AstraOS MVP Foundation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight"
          >
            A Digital Operating System <br />
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              for the AI Era
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Communicate, collaborate, automate, and build—all from one intelligent platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link href="/auth/register">
              <Button className="h-12 px-6 text-base flex items-center gap-2 group">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" className="h-12 px-6 text-base flex items-center gap-2 bg-white">
                <Play className="h-4 w-4 text-indigo-600 fill-indigo-600" />
                Watch Demo
              </Button>
            </a>
          </motion.div>

          {/* Animated Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-20 max-w-5xl mx-auto rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-indigo-600/10"
          >
            <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl -z-10" />

            {/* Mock Dashboard Shell */}
            <div className="overflow-hidden rounded-lg bg-slate-950 border border-slate-800 text-left text-slate-300">
              {/* Header bar */}
              <div className="h-11 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-500 font-mono">AstraOS v1.0.0-MVP</div>
                <div className="w-12" />
              </div>

              {/* Main content grid */}
              <div className="grid grid-cols-12 h-[450px]">
                {/* Sidebar Mockup */}
                <div className="col-span-3 border-r border-slate-800 bg-slate-900/20 p-4 flex flex-col gap-6 text-xs text-slate-400">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800/40 text-slate-200">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    <span className="font-semibold">Core Workspace</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="px-2 font-semibold text-[10px] text-slate-500 uppercase tracking-wider">Communication</div>
                    <div className="flex items-center gap-2 px-2 py-1 text-slate-300"><MessageSquare className="h-3.5 w-3.5" /> #announcements</div>
                    <div className="flex items-center gap-2 px-2 py-1"><Users className="h-3.5 w-3.5" /> #development</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="px-2 font-semibold text-[10px] text-slate-500 uppercase tracking-wider">Productivity</div>
                    <div className="flex items-center gap-2 px-2 py-1"><FileText className="h-3.5 w-3.5" /> System Notes</div>
                    <div className="flex items-center gap-2 px-2 py-1 text-indigo-400"><CheckCircle2 className="h-3.5 w-3.5" /> Core Roadmap</div>
                  </div>
                </div>

                {/* Dashboard Main Mockup */}
                <div className="col-span-9 p-6 flex flex-col gap-6 bg-slate-950/80 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Welcome back, Admin</h3>
                      <p className="text-xs text-slate-500">Your AI Agent is active and running 3 scheduled triggers.</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">HR</div>
                  </div>

                  {/* Widgets */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">AI Insights</span>
                      <span className="text-xl font-bold text-white">3 Actionable Items</span>
                      <span className="text-[11px] text-emerald-400">Optimize cache storage +12%</span>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active Workspace</span>
                      <span className="text-xl font-bold text-white">AstraOS Team</span>
                      <span className="text-[11px] text-indigo-400">4 members active now</span>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">API Health</span>
                      <span className="text-xl font-bold text-white">99.98%</span>
                      <span className="text-[11px] text-indigo-400">All gateway tasks online</span>
                    </div>
                  </div>

                  {/* Simulated terminal logs or code snippets */}
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 font-mono text-[11px] text-slate-400 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-1.5">
                      <span>MONOREPO CONSOLE</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                    <div>$ turbo run dev</div>
                    <div className="text-indigo-400">• @repo/types: compile success (127ms)</div>
                    <div className="text-indigo-400">• @repo/shared: loaded mock generators</div>
                    <div className="text-emerald-400">✔ web: Next.js dev server listening on http://localhost:3000</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              One Unified Environment
            </h2>
            <p className="mt-4 text-slate-600">
              AstraOS removes the friction of jumping between tabs. Every module is a plug-and-play workspace package that talks to the same client API.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Card 
                  key={idx} 
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-50 hover:bg-white"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-indigo-600 transition-colors" />
                  <div className={`p-2.5 rounded-lg border w-fit ${card.color} mb-4`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{card.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Assistant Section (with live prompt mockup) */}
      <section id="demo" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" className="mb-4">Intelligence Platform</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Intelligent Actions, <br />Everywhere
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Unlike generic assistants, AstraOS utilizes an integrated workspace graph. AI can search, write, edit, trigger task queues, build documentation, and launch autonomous background loops directly on your instruction.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-700">Semantic Vector Search across user folders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-700">Automated CRM pipeline summarization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-slate-700">Generative invoice drafting with Tax compliance logs</span>
              </div>
            </div>
          </div>

          {/* Interactive Prompt Simulator Widget */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Cpu className="h-4 w-4 text-indigo-600" />
                <span>AI Prompt Simulator</span>
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask AI anything..."
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <Button onClick={handleAiTrigger} disabled={isAiLoading} size="sm">
                Run Prompt
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 min-h-[140px] flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 flex items-center gap-1.5 uppercase">
                <Terminal className="h-3 w-3" />
                <span>Console Response Output</span>
              </span>
              {isAiLoading ? (
                <div className="flex items-center gap-2 mt-4 text-slate-500 animate-pulse">
                  <svg className="animate-spin h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Gemini reasoning pipeline compiling...</span>
                </div>
              ) : aiOutput ? (
                <pre className="whitespace-pre-wrap leading-relaxed text-indigo-200">{aiOutput}</pre>
              ) : (
                <span className="text-slate-600 italic">Enter a request above (e.g. "Draft an onboarding task list") and hit Run.</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Mockup Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Capabilities Overview</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Explore the Modules
            </h2>
            <p className="mt-4 text-slate-600">
              Click through the main operational centers to see high-fidelity mocked screens representing the core system functionalities.
            </p>

            {/* Interactive Tab Headers */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-3">
              {[
                { id: "ai", label: "AI & Agents", icon: Cpu },
                { id: "comm", label: "Chat & Meet", icon: MessageSquare },
                { id: "prod", label: "Notes & Tasks", icon: CheckCircle2 },
                { id: "business", label: "Business CRM & Invoices", icon: BarChart3 },
                { id: "dev", label: "Dev Platform", icon: Code }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeFeatureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFeatureTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      active 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                        : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Tab Previews */}
          <div className="max-w-4xl mx-auto p-6 rounded-xl border border-slate-200 bg-slate-50/50 shadow-inner min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeFeatureTab === "ai" && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-slate-700"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">AI Agents Workspace</span>
                    <Badge variant="primary">2 Agents Running</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="h-5 w-5 text-indigo-600" />
                        <h4 className="font-semibold text-slate-900 text-sm">Coding Assistant Agent</h4>
                      </div>
                      <p className="text-xs text-slate-500">Auto-reviews PR webhooks and writes lint corrections using types mapping.</p>
                      <Badge variant="success" className="mt-3 text-[10px]">Active</Badge>
                    </Card>
                    <Card className="bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="h-5 w-5 text-indigo-600" />
                        <h4 className="font-semibold text-slate-900 text-sm">Semantic Search Agent</h4>
                      </div>
                      <p className="text-xs text-slate-500">Indexes shared notes, attachments, and customer contacts in Qdrant Vector database.</p>
                      <Badge variant="secondary" className="mt-3 text-[10px]">Idle</Badge>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "comm" && (
                <motion.div
                  key="comm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-slate-700"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Live Chat Interface</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5"><Users className="h-3 w-3 text-indigo-500" /> 14 active in #development</span>
                  </div>
                  <div className="flex flex-col gap-3 p-4 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-xs">SC</div>
                      <div>
                        <div className="flex items-center gap-2"><span className="text-xs font-bold text-slate-900">Sarah Chen</span><span className="text-[10px] text-slate-400">12:32 PM</span></div>
                        <p className="text-xs text-slate-600 mt-0.5">Let's compile the Flutter dependencies in apps/mobile. Do we have the pubspec file configured?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs">HR</div>
                      <div>
                        <div className="flex items-center gap-2"><span className="text-xs font-bold text-slate-900">Harsh Raj</span><span className="text-[10px] text-slate-400">12:34 PM</span></div>
                        <p className="text-xs text-slate-600 mt-0.5">Yep! Built a mock structure for apps/mobile. I'll drop the file location link: [apps/mobile/pubspec.yaml]</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "prod" && (
                <motion.div
                  key="prod"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-slate-700"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Interactive Tasks Boards</span>
                    <span className="text-xs text-indigo-600 font-semibold cursor-pointer flex items-center gap-1">Add Task <ArrowRight className="h-3 w-3" /></span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 w-fit rounded">TODO</span>
                      <h5 className="text-xs font-bold text-slate-900">Implement Figma tokens translation</h5>
                      <p className="text-[11px] text-slate-400">Convert CSS configurations in @repo/ui.</p>
                    </div>
                    <div className="p-3 rounded bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 w-fit rounded">IN PROGRESS</span>
                      <h5 className="text-xs font-bold text-slate-900">Configure Turborepo pipeline caching</h5>
                      <p className="text-[11px] text-slate-400">Write custom build/lint workspace caches inside turbo.json.</p>
                    </div>
                    <div className="p-3 rounded bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 w-fit rounded">DONE</span>
                      <h5 className="text-xs font-bold text-slate-900">Verify OAuth redirect URLs</h5>
                      <p className="text-[11px] text-slate-400">Google and GitHub logins tested.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "business" && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-slate-700"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Billing & CRM Registry</span>
                    <Badge variant="success">Revenue Tracking Active</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-slate-200 font-mono text-xs flex flex-col gap-2.5">
                    <div className="flex justify-between border-b border-slate-100 pb-1 text-slate-500">
                      <span>CUSTOMER</span>
                      <span>INVOICE ID</span>
                      <span>TOTAL DUE</span>
                      <span>STATUS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans font-bold text-slate-800">Sarah Chen</span>
                      <span>INV-1092</span>
                      <span className="font-bold">$4,500.00</span>
                      <span className="text-emerald-500 font-bold">PAID</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans font-bold text-slate-800">David K.</span>
                      <span>INV-1093</span>
                      <span className="font-bold">$1,200.00</span>
                      <span className="text-amber-500 font-bold">PENDING</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "dev" && (
                <motion.div
                  key="dev"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-slate-700"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Developer Hub Config</span>
                    <span className="text-xs text-indigo-600 font-mono">Swagger Docs</span>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300">
                    <div className="text-slate-500">// TypeScript API Contract definition</div>
                    <span className="text-indigo-400">import</span> {"{ User }"} <span className="text-indigo-400">from</span> <span className="text-emerald-400">"@repo/types"</span>;
                    <br /><br />
                    <span className="text-indigo-400">export async function</span> <span className="text-amber-300">getUserProfile</span>(id: string): Promise{"<User>"} {"{"}
                    <div className="pl-4 text-slate-200">
                      const res = await fetch(`/api/v1/users/${id}`);
                      return res.json();
                    </div>
                    {"}"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">Customer Love</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Trusted by Top Founders & Builders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="bg-white flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm italic text-slate-600 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full border border-indigo-100" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Flexible Plans</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-slate-600">
              Start building for free or choose a plan designed for your team scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="flex flex-col justify-between border-slate-200">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Free Starter</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for individuals and side projects.</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="flex flex-col gap-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 1 Core Workspace</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic AI Chat (50 msgs/day)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Chat Messaging history (7 days)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 1GB Secure File Upload</li>
                </ul>
              </div>
              <Link href="/auth/register" className="mt-8">
                <Button variant="outline" className="w-full">Sign Up Free</Button>
              </Link>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col justify-between border-indigo-600 relative ring-2 ring-indigo-600/20 shadow-lg shadow-indigo-600/5">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Team Pro</h3>
                <p className="text-xs text-slate-400 mt-1">For growing teams wanting automation.</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-slate-900">$19</span>
                  <span className="text-slate-400 text-xs"> / user / month</span>
                </div>
                <ul className="flex flex-col gap-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlimited Workspaces & Members</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Advanced AI (Unlimited & LangGraph)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Full Chat History & Integrations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 50GB File Storage with S3</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> CRM, Billing, Invoices integration</li>
                </ul>
              </div>
              <Link href="/auth/register" className="mt-8">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </Card>

            {/* Enterprise Plan */}
            <Card className="flex flex-col justify-between border-slate-200">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">For large-scale security compliance.</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-slate-900">Custom</span>
                  <span className="text-slate-400 text-xs"> / pricing</span>
                </div>
                <ul className="flex flex-col gap-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Custom integrations & Webhooks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dedicated autonomous LLM agents</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> High-Availability Kubernetes setups</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> SSO/SAML, audit logs & RBAC policies</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dedicated support representative</li>
                </ul>
              </div>
              <Link href="/auth/register" className="mt-8">
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <div className="h-7 w-7 rounded bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span>AstraOS</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              A digital operating system powered by AI. Designed to communicate, collaborate, automate, and build from one platform.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Product</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">AI Playground</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link href="/docs/vision.md" className="hover:text-white transition-colors">System Vision</Link></li>
              <li><Link href="/docs/architecture.md" className="hover:text-white transition-colors">Architecture</Link></li>
              <li><Link href="/docs/api-design.md" className="hover:text-white transition-colors">API Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} AstraOS Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
