import { usePage } from "@inertiajs/react";
import { useSidebar } from "@/Context/SidebarContext";
import SidebarItem from "@/Components/SidebarItem";
import SidebarDebug from "@/Components/SidebarDebug";

const fallbackNavigation = [
    {
        id: "dashboard",
        label: "Inicio",
        route: "dashboard",
    },
    {
        id: "courses",
        label: "Cursos",
        children: [
            {
                id: "courses-placeholder",
                label: "Carga cursos desde Laravel",
                route: null,
            },
        ],
    },
    {
        id: "profile",
        label: "Perfil",
        route: "profile.edit",
    },
];

export default function Sidebar() {
    const { collapsed, mobileOpen, toggleCollapsed, closeMobile } =
        useSidebar();
    const page = usePage();
    const navigation = page.props.sidebarNavigation || fallbackNavigation;
    const currentRouteName = page.props.currentRouteName;
    const currentRouteParams = page.props.currentRouteParams || {};

    const widthClass = collapsed ? "w-20" : "w-80";
    const contentPadding = collapsed ? "px-0" : "px-2";

    return (
        <>
            <aside
                className={`hidden md:flex md:h-screen md:flex-col md:border-r md:border-gray-200 md:bg-white md:py-4 md:transition-all ${widthClass}`}
            >
                <div
                    className={`flex items-center justify-between border-b border-gray-200 ${contentPadding} px-3 pb-4`}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 text-base font-bold text-white shadow-sm">
                            LMS
                        </div>
                        {!collapsed && (
                            <div>
                                <div className="text-base font-semibold text-slate-900">
                                    Campus LMS
                                </div>
                                <div className="text-xs text-slate-500">
                                    Navegación general
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={toggleCollapsed}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        aria-label={
                            collapsed ? "Expandir sidebar" : "Colapsar sidebar"
                        }
                    >
                        {collapsed ? ">" : "<"}
                    </button>
                </div>

                <nav
                    className={`flex-1 overflow-y-auto ${contentPadding} pb-4`}
                >
                    <div className="space-y-1">
                        {navigation.map((item) => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                depth={0}
                                collapsed={collapsed}
                                closeMobile={closeMobile}
                                currentRouteName={currentRouteName}
                                currentRouteParams={currentRouteParams}
                            />
                        ))}
                    </div>
                </nav>

                {!collapsed && <SidebarDebug />}
            </aside>

            <div
                className={`fixed inset-0 z-40 md:hidden ${mobileOpen ? "block" : "hidden"}`}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="absolute inset-0 bg-slate-900/30"
                    onClick={closeMobile}
                />
                <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
                        <div className="text-lg font-semibold text-slate-900">
                            LMS
                        </div>
                        <button
                            type="button"
                            onClick={closeMobile}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                            aria-label="Cerrar sidebar"
                        >
                            ×
                        </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="space-y-2">
                            {navigation.map((item) => (
                                <SidebarItem
                                    key={item.id}
                                    item={item}
                                    depth={0}
                                    collapsed={false}
                                    closeMobile={closeMobile}
                                    currentRouteName={currentRouteName}
                                    currentRouteParams={currentRouteParams}
                                />
                            ))}
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    );
}
