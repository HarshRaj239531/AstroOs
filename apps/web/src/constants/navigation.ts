import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    Folder,
    CheckSquare,
    Sparkles,
} from "lucide-react";

import { SidebarItem } from "@/types/navigation";

export const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Workspace",
        href: "/workspace",
        icon: Briefcase,
    },
    {
        title: "Chat",
        href: "/chat",
        icon: MessageSquare,
    },
    {
        title: "Files",
        href: "/files",
        icon: Folder,
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
    },
    {
        title: "AI Assistant",
        href: "/ai",
        icon: Sparkles,
    },
];