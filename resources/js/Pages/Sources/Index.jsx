import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LmsTable from "@/Components/LmsTable";
import TopMenu from "@/Components/TopMenu";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { router, Link, Head } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import SourceForm from "@/Components/SourceForm";

const Index = ({ auth, sources }) => {
    const [showForm, setShowForm] = useState(false);
    const [selectedSource, setSelectedSource] = useState({});

    const title = "Fuentes de Información";

    const columns = [
        {
            title: "Nombre",
            field: "name",
            sortable: true,
        },
        {
            title: "Autor",
            field: "author",
            sortable: true,
        },
        {
            title: "Fecha",
            field: "source_date",
            sortable: false,
        },
        {
            title: "Fuente",
            field: "source_name",
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
            displayFormatter: editSource,
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
        if (confirm("Eliminar la fuente " + s.name + "? De veras?")) {
            fetch(route("source.destroy", { id: s.id })).then((r) =>
                window.location.reload(),
            );
        }
    };

    function displayActive(data) {
        return data.active === 1 ? "Sí" : "No";
    }

    function editSource(data) {
        return (
            <div className="flex">
                <button className="mx-1" onClick={() => edit(data)}>
                    <FaPencilAlt />
                </button>
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
            show={["source-add"]}
            sourceAdd={() => edit({})}
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
                        data={sources}
                        initialSort="name"
                    />
                </div>
            </div>
            <Modal show={showForm} onClose={closeModal}>
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <SourceForm
                        source={selectedSource}
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
