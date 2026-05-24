"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Send } from "lucide-react";
import { Button } from "@repo/ui";
import { useAstraStore } from "@/store";

export default function ChatConsole() {
  const { currentUser, messages, addMessage } = useAstraStore();
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser) return;
    addMessage(chatInput, currentUser.id);
    setChatInput("");
  };

  return (
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
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-indigo-500" />{" "}
          <span className="text-xs font-bold text-slate-700">3 active</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUser?.id;
          const name = isOwn ? "Harsh Raj" : msg.senderId === "usr-2" ? "Sarah Chen" : "Alex Rivera";
          const avatar = isOwn
            ? currentUser?.avatar
            : msg.senderId === "usr-2"
            ? "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah"
            : "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[80%] ${
                isOwn ? "self-end flex-row-reverse text-right" : "self-start"
              }`}
            >
              <img src={avatar} alt={name} className="h-8 w-8 rounded-full border shrink-0" />
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-800">{name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div
                  className={`mt-1.5 p-3 rounded-lg text-xs leading-relaxed ${
                    isOwn
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-slate-100 text-slate-700 rounded-tl-none"
                  }`}
                >
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
  );
}
