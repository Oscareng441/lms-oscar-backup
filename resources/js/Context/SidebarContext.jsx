import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleCollapsed = () => setCollapsed((value) => !value);
    const toggleMobileOpen = () => setMobileOpen((value) => !value);
    const closeMobile = () => setMobileOpen(false);

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                mobileOpen,
                toggleCollapsed,
                toggleMobileOpen,
                closeMobile,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }
    return context;
}
