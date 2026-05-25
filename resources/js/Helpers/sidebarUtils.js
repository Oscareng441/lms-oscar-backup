function compareParams(itemParams = {}, currentParams = {}) {
    const keys = Object.keys(itemParams);

    if (keys.length === 0) {
        return true;
    }

    return keys.every(
        (key) => String(itemParams[key]) === String(currentParams[key] ?? ''),
    );
}

export function isSidebarItemActive(item, currentRouteName, currentRouteParams) {
    if (!item || !currentRouteName) {
        return false;
    }

    if (
        item.route &&
        item.route === currentRouteName &&
        compareParams(item.params || {}, currentRouteParams || {})
    ) {
        return true;
    }

    const isProblemRoute =
        item.route?.startsWith('problem.') &&
        currentRouteName.startsWith('problem.');

    if (
        isProblemRoute &&
        compareParams(item.params || {}, currentRouteParams || {})
    ) {
        return true;
    }

    if (Array.isArray(item.children)) {
        return item.children.some((child) =>
            isSidebarItemActive(child, currentRouteName, currentRouteParams),
        );
    }

    return false;
}
