export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export enum UserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  AWAY = "AWAY"
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  status: UserStatus;
}

export interface UserSettings extends BaseEntity {
  userId: string;
  theme: "light" | "dark";
  language: string;
  notificationsEnabled: boolean;
}

export interface Workspace extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  ownerId: string;
}

export interface WorkspaceMember extends BaseEntity {
  workspaceId: string;
  userId: string;
  roleId: string;
}

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE"
}

export interface Message extends BaseEntity {
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  replyToId: string | null;
}

export interface MessageReaction extends BaseEntity {
  messageId: string;
  userId: string;
  emoji: string;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export interface Task extends BaseEntity {
  title: string;
  description: string;
  workspaceId: string;
  assignedTo: string;
  status: TaskStatus;
  dueDate: string;
}

export interface Note extends BaseEntity {
  title: string;
  content: string;
  ownerId: string;
  workspaceId: string;
}

export interface Product extends BaseEntity {
  workspaceId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Invoice extends BaseEntity {
  workspaceId: string;
  customerId: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "OVERDUE";
}

export interface Customer extends BaseEntity {
  workspaceId: string;
  name: string;
  email: string;
  phone: string;
}
