import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { isSidebarItemActive } from "@/Helpers/sidebarUtils";

export default function SidebarItem({
    item,
    depth = 0,
    collapsed = false,
    closeMobile,
    currentRouteName,
    currentRouteParams,
}) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren =
        Array.isArray(item.children) && item.children.length > 0;
    const active = useMemo(
        () => isSidebarItemActive(item, currentRouteName, currentRouteParams),
        [item, currentRouteName, currentRouteParams],
    );

    // Debug logging
    if (depth === 0 && item.children && item.children.length > 0) {
        console.log(
            `[Sidebar Debug] Item: ${item.label}, Route: ${item.route}, Active: ${active}, CurrentRouteName: ${currentRouteName}, CurrentRouteParams:`,
            currentRouteParams,
        );
    }
    const href = getHref(item);
    const style = collapsed ? {} : { paddingLeft: `${depth * 16 + 12}px` };

    function getHref(item) {
        if (!item.route) {
            return null;
        }
        return item.params ? route(item.route, item.params) : route(item.route);
    }

    const ref = useRef(null);

    useEffect(() => {
        if (active && hasChildren) {
            setExpanded(true);
        }
    }, [active, hasChildren]);

    useEffect(() => {
        if (active && ref.current) {
            try {
                ref.current.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                    inline: "nearest",
                });
            } catch (e) {
                // ignore
            }
        }
    }, [active]);

    const icon = (
        <div
            className={`flex h-8 w-8 items-center justify-center rounded-2xl text-sm font-semibold text-white ${
                active ? "bg-indigo-600" : "bg-slate-400"
            }`}
        >
            {item.icon || item.label.charAt(0)}
        </div>
    );

    return (
        <div ref={ref}>
            <div
                className={`group flex items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                } ${collapsed ? "justify-center" : ""}`}
                style={style}
                title={item.label}
            >
                <div className="flex items-center gap-2 truncate">
                    {href && collapsed ? (
                        <Link href={href} preserveScroll onClick={closeMobile}>
                            {icon}
                        </Link>
                    ) : (
                        icon
                    )}
                    {!collapsed &&
                        (href ? (
                            <Link
                                href={href}
                                preserveScroll
                                onClick={closeMobile}
                                className="truncate"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="truncate">{item.label}</span>
                        ))}
                </div>

                {hasChildren && !collapsed && (
                    <button
                        type="button"
                        onClick={() => setExpanded((value) => !value)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-expanded={expanded}
                        aria-label={
                            expanded ? "Colapsar sección" : "Expandir sección"
                        }
                    >
                        {expanded ? (
                            <HiChevronDown className="h-4 w-4" />
                        ) : (
                            <HiChevronRight className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>

            {hasChildren && expanded && (
                <div className="space-y-1">
                    {item.children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            collapsed={collapsed}
                            closeMobile={closeMobile}
                            currentRouteName={currentRouteName}
                            currentRouteParams={currentRouteParams}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
