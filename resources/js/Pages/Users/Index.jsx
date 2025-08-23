import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LmsTable from '@/Components/LmsTable';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, users }) => {

    const title = 'Usuarios'

    const columns = [
        {
            title: 'Nombre',
            field: 'name',
            sortable: true,
        },
        {
            title: 'Email',
            field: 'email',
            sortable: true,
        },
        {
            title: 'Vigente',
            field: 'active',
            sortable: false,
            displayFormatter: yy
        },
        {
            title: 'Role',
            field: 'role',
            sortable: true,
            displayFormatter: zz
        },
        {
            title: 'Acciones',
            field: '',
            sortable: false,
            displayFormatter: xx
        },
    ]

    function yy(data) {
        return data.active ? 'sí' : 'no'
    }

    function zz(data) {
        switch (data.role) {
        case 'admin':
            return 'admin'
        case 'teacher':
            return 'maestr@'
        default:
            return 'estudiante'
        }
    }

    function xx(data) {
        return (<Link href={route('user.edit', { id: data.id })}>editar</Link>)
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
                        data={users}
                        initialSort="name"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
