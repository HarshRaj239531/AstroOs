import { ReactNode } from "react";

import Sidebar from "../navigation/Sidebar";
import Topbar from "../navigation/Topbar";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Topbar />

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}