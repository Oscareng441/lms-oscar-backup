import { useSidebar } from "@/Context/SidebarContext";
import SidebarItem from "@/Components/SidebarItem";
import { sidebarNavigation } from "@/Helpers/navigation";

export default function Sidebar() {
    const { collapsed, mobileOpen, toggleCollapsed, closeMobile } =
        useSidebar();

    const desktopWidth = collapsed ? "w-20" : "w-72";
    const collapsedClasses = collapsed ? "items-center justify-center" : "";

    return (
        <>
            <aside
                className={`hidden md:flex md:h-screen md:flex-col md:border-r md:border-gray-200 md:bg-white md:px-2 md:py-4 ${desktopWidth} transition-all duration-200`}
            >
                <div
                    className={`flex items-center justify-between px-3 pb-4 ${collapsedClasses}`}
                >
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-indigo-600" />
                        {!collapsed && (
                            <span className="text-lg font-semibold text-gray-900">
                                LMS
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={toggleCollapsed}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                        aria-label="Toggle sidebar"
                    >
                        {collapsed ? ">" : "<"}
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-2">
                    <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                            <SidebarItem key={item.id} item={item} />
                        ))}
                    </div>
                </nav>
            </aside>

            <div
                className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "block" : "hidden"}`}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="absolute inset-0 bg-black/30"
                    onClick={closeMobile}
                />
                <aside className="relative flex h-full w-64 flex-col bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                        <div className="text-lg font-semibold text-gray-900">
                            LMS
                        </div>
                        <button
                            type="button"
                            onClick={closeMobile}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                            aria-label="Close sidebar"
                        >
                            ×
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-3 py-4">
                        <div className="space-y-1">
                            {sidebarNavigation.map((item) => (
                                <SidebarItem key={item.id} item={item} />
                            ))}
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    );
}
