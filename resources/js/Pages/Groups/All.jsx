import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaPencilAlt ,FaTrash} from 'react-icons/fa';
import LmsTable from '@/Components/LmsTable';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, groups }) => {

    const title = 'Grupos'

    const columns = [
        {
            title: 'Nombre',
            field: 'name',
            css: 'w-[25%]',
            sortable: true,
        },
        {
            title: 'Curso',
            field: 'course',
            sortable: true,
        },
        {
            title: 'Escuela',
            field: 'school',
            sortable: true,
        },
        {
            title: 'Miembros',
            field: 'member_count',
            css: 'w-[5%]',
            sortable: true,
        },
        {
            title: 'Dueños',
            field: 'owners',
            sortable: false,
        },
        {
            title: 'Vigente',
            field: 'active',
            css: 'w-[5%]',
            sortable: false,
            displayFormatter: displayActive,
        },
        {
            title: 'Acciones',
            field: '',
            css: 'w-[5%]',
            sortable: false,
            displayFormatter: actions
        },
    ]

    function displayActive(data) {
        return data.active ? 'sí' : 'no'
    }

    const trash = (s) => {
        if (confirm("Eliminar el grupo " + s.name + "? De veras?")) {
            alert("en desarrollo...")
            // fetch(route('group.destroy', { id: s.id }))
            // .then(r => window.location.reload())
        }
    }

    function actions(data) {
        return (
            <div className="flex">
                {/*<Link as 'button' className="mx-1" href={ route('course.groupShow') }><FaPencilAlt /></Link>*/}
                <Link href={ route('course.groupShow', data.id)} >
                    <FaPencilAlt className="text-base mx-4 cursor-pointer" />
                </Link>
                <button className="mx-1" onClick={ () => trash(data) }><FaTrash /></button>
            </div>
        )
    }

    let topMenu = (
        <TopMenu auth={auth} title={ title } show={['user-add']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <LmsTable
                        columns={columns}
                        data={groups}
                        initialSort="name"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
