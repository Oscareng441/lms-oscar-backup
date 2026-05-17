export const sidebarNavigation = [
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
