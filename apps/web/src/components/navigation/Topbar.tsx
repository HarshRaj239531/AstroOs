export default function Topbar() {
    return (
        <header className="h-16 border-b flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold">
                AstraOS
            </h1>

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600" />
            </div>
        </header>
    );
}