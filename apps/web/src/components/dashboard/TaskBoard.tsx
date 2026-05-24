"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Badge } from "@repo/ui";
import { useAstraStore } from "@/store";
import { TaskStatus } from "@repo/types";

export default function TaskBoard() {
  const { tasks, addTask, updateTaskStatus } = useAstraStore();
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    addTask(taskInput, "Task description generated from dashboard console.", "usr-2");
    setTaskInput("");
  };

  return (
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
          <Button type="submit" size="sm">
            Create Task
          </Button>
        </form>
      </Card>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TODO Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">TODO</span>
            <Badge variant="secondary">{tasks.filter((t) => t.status === TaskStatus.TODO).length}</Badge>
          </div>
          {tasks
            .filter((t) => t.status === TaskStatus.TODO)
            .map((task) => (
              <Card key={task.id} className="bg-white flex flex-col gap-3 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[9px] font-mono text-slate-400">Assigned: Sarah Chen</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateTaskStatus(task.id, TaskStatus.IN_PROGRESS)}
                    className="text-[9px] h-7 px-2"
                  >
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
            <Badge variant="primary">{tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length}</Badge>
          </div>
          {tasks
            .filter((t) => t.status === TaskStatus.IN_PROGRESS)
            .map((task) => (
              <Card key={task.id} className="bg-white border-indigo-100 flex flex-col gap-3 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[9px] font-mono text-slate-400">Assigned: Harsh Raj</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateTaskStatus(task.id, TaskStatus.DONE)}
                    className="text-[9px] h-7 px-2 text-emerald-600"
                  >
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
            <Badge variant="success">{tasks.filter((t) => t.status === TaskStatus.DONE).length}</Badge>
          </div>
          {tasks
            .filter((t) => t.status === TaskStatus.DONE)
            .map((task) => (
              <Card key={task.id} className="bg-slate-50/50 opacity-70 flex flex-col gap-3 shadow-none border-dashed">
                <h4 className="text-xs font-bold text-slate-800 line-through">{task.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[9px] font-mono text-slate-400">Completed</span>
                  <Badge variant="success" className="text-[8px]">
                    RESOLVED
                  </Badge>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
