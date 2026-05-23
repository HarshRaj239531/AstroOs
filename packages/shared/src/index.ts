import { User, UserStatus, Workspace, Message, MessageType, Task, TaskStatus } from "@repo/types";

// Validation helpers
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

// Formatting helpers
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Mock Data Generators for UI
export const createMockUser = (id: string, name: string, email: string): User => ({
  id,
  firstName: name.split(" ")[0],
  lastName: name.split(" ")[1] || "",
  username: name.toLowerCase().replace(" ", ""),
  email,
  password: "",
  avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
  bio: "Lead Developer & System Architect at AstraOS.",
  isVerified: true,
  status: UserStatus.ONLINE,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null
});

export const MOCK_CURRENT_USER = createMockUser("usr-1", "Harsh Raj", "harsh@example.com");

export const MOCK_USERS: User[] = [
  MOCK_CURRENT_USER,
  createMockUser("usr-2", "Sarah Chen", "sarah@example.com"),
  createMockUser("usr-3", "Alex Rivera", "alex@example.com"),
  createMockUser("usr-4", "David K.", "david@example.com")
];

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "AstraOS Core Team",
    slug: "astraos-core",
    description: "Main workspace for coordinating the AstraOS system launch.",
    ownerId: "usr-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  {
    id: "ws-2",
    name: "Design & UX System",
    slug: "design-ux",
    description: "Brand alignment and token discussions.",
    ownerId: "usr-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "usr-2",
    content: "Hey team! Have we verified the latest database migration files in docs?",
    messageType: MessageType.TEXT,
    replyToId: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    deletedAt: null
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "usr-1",
    content: "Yes, I just reviewed `database-design.md`. Everything looks solid. We're using UUIDs globally.",
    messageType: MessageType.TEXT,
    replyToId: "msg-1",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    deletedAt: null
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "usr-3",
    content: "Awesome, I'll start working on implementing the authentication pages now.",
    messageType: MessageType.TEXT,
    replyToId: null,
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date(Date.now() - 600000).toISOString(),
    deletedAt: null
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Configure Turborepo pipeline caching",
    description: "Write custom build/lint workspace caches inside `turbo.json`.",
    workspaceId: "ws-1",
    assignedTo: "usr-1",
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  {
    id: "task-2",
    title: "Implement Figma tokens translation",
    description: "Translate Tailwind brand and sizing specs to css utilities in `packages/ui`.",
    workspaceId: "ws-1",
    assignedTo: "usr-2",
    status: TaskStatus.TODO,
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  {
    id: "task-3",
    title: "Verify OAuth redirect URLs",
    description: "Setup test credentials for Google and GitHub authentication logins.",
    workspaceId: "ws-1",
    assignedTo: "usr-3",
    status: TaskStatus.DONE,
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  }
];
