"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { SIDEBAR_ITEMS } from "@/constants/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r bg-background h-screen p-4">
            <Logo />

            <nav className="mt-10 space-y-2">
                {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;

                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${active
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-muted"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
} "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { SIDEBAR_ITEMS } from "@/constants/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r bg-background h-screen p-4">
            <Logo />

            <nav className="mt-10 space-y-2">
                {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;

                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${active
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-muted"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}