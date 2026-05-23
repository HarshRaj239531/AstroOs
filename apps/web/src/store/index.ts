import { create } from "zustand";
import { User, Workspace, Message, Task, TaskStatus } from "@repo/types";
import { MOCK_CURRENT_USER, MOCK_WORKSPACES, MOCK_MESSAGES, MOCK_TASKS } from "@repo/shared";

interface AstraState {
  // Auth state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Workspaces
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (name: string, description: string) => void;

  // Chat
  messages: Message[];
  addMessage: (content: string, senderId: string) => void;

  // Tasks
  tasks: Task[];
  addTask: (title: string, description: string, assignedTo: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;

  // Notifications
  notifications: Array<{ id: string; title: string; body: string; isRead: boolean }>;
  addNotification: (title: string, body: string) => void;
  markNotificationsRead: () => void;
}

export const useAstraStore = create<AstraState>((set) => ({
  currentUser: MOCK_CURRENT_USER,
  setCurrentUser: (user) => set({ currentUser: user }),

  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),

  workspaces: MOCK_WORKSPACES,
  activeWorkspace: MOCK_WORKSPACES[0],
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  addWorkspace: (name, description) =>
    set((state) => {
      const newWorkspace: Workspace = {
        id: `ws-${state.workspaces.length + 1}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description,
        ownerId: state.currentUser?.id || "usr-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };
      return {
        workspaces: [...state.workspaces, newWorkspace],
        activeWorkspace: newWorkspace,
      };
    }),

  messages: MOCK_MESSAGES,
  addMessage: (content, senderId) =>
    set((state) => {
      const newMessage: Message = {
        id: `msg-${state.messages.length + 1}`,
        conversationId: "conv-1",
        senderId,
        content,
        messageType: 0 as any, // Text message type
        replyToId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };
      return { messages: [...state.messages, newMessage] };
    }),

  tasks: MOCK_TASKS,
  addTask: (title, description, assignedTo) =>
    set((state) => {
      const newTask: Task = {
        id: `task-${state.tasks.length + 1}`,
        title,
        description,
        workspaceId: state.activeWorkspace?.id || "ws-1",
        assignedTo,
        status: TaskStatus.TODO,
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };
      return { tasks: [...state.tasks, newTask] };
    }),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),

  notifications: [
    { id: "notif-1", title: "New Task Assigned", body: "Sarah Chen assigned you 'Configure Turborepo pipeline caching'", isRead: false },
    { id: "notif-2", title: "Workspace Invitation", body: "David invited you to join 'Marketing Strategy'", isRead: true },
  ],
  addNotification: (title, body) =>
    set((state) => ({
      notifications: [
        { id: `notif-${state.notifications.length + 1}`, title, body, isRead: false },
        ...state.notifications,
      ],
    })),
  markNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
}));
