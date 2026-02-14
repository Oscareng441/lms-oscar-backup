import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LmsTable from "@/Components/LmsTable";
import TopMenu from "@/Components/TopMenu";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { router, Link, Head } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import SchoolForm from "@/Components/SchoolForm";

const Index = ({ auth, schools }) => {
    const [showForm, setShowForm] = useState(false);
    const [selectedSource, setSelectedSource] = useState({});

    const title = "Escuelas";

    const columns = [
        {
            title: "Nombre",
            field: "name",
            sortable: true,
        },
        {
            title: "Vigente",
            field: "active",
            sortable: true,
            displayFormatter: displayActive,
        },
        {
            title: "Acciones",
            field: "",
            sortable: false,
            displayFormatter: actions,
        },
    ];

    const toggleShowForm = () => {
        setShowForm(!showForm);
    };

    const closeModal = () => {
        setShowForm(false);
    };

    const edit = (s) => {
        setSelectedSource(s);
        toggleShowForm();
    };

    const trash = (s) => {
        if (confirm("Eliminar la escuela " + s.name + "? De veras?")) {
            fetch(route("school.destroy", { id: s.id })).then((r) =>
                window.location.reload(),
            );
        }
    };

    function displayActive(data) {
        return data.active === 1 ? "Sí" : "No";
    }

    function actions(data) {
        return (
            <div className="flex">
                <button className="mx-1" onClick={() => edit(data)}>
                    <FaPencilAlt />
                </button>
                <Link
                    as="button"
                    className="mx-1"
                    href={route("school.users", data.id)}
                >
                    <FaUserGroup />
                </Link>
                <button className="mx-1" onClick={() => trash(data)}>
                    <FaTrash />
                </button>
            </div>
        );
    }

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            show={["school-add"]}
            schoolAdd={() => edit({})}
        />
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
        >
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <LmsTable
                        columns={columns}
                        data={schools}
                        initialSort="name"
                    />
                </div>
            </div>
            <Modal show={showForm} onClose={closeModal}>
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <SchoolForm
                        school={selectedSource}
                        afterSubmit={(n) => {
                            console.log("hi", n);
                            setShowForm(false);
                        }}
                    />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
