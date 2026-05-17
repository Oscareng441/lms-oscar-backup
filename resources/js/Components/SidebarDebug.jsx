import { usePage } from "@inertiajs/react";

export default function SidebarDebug() {
    const page = usePage();
    const currentRouteName = page.props.currentRouteName;
    const currentRouteParams = page.props.currentRouteParams || {};

    return (
        <div className="border-t border-gray-300 bg-slate-50 px-3 py-3 text-xs">
            <div className="font-mono text-slate-700">
                <div>
                    <strong>Current Route:</strong>{" "}
                    {currentRouteName || "undefined"}
                </div>
                <div>
                    <strong>Route Params:</strong>{" "}
                    {JSON.stringify(currentRouteParams)}
                </div>
            </div>
        </div>
    );
}
