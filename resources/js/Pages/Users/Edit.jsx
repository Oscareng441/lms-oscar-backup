// import { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopMenu from '@/Components/TopMenu';
import { useForm } from '@inertiajs/react';

export default function Edit(props) {
    const { data, setData, post } = useForm({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        active: props.user.active,
    })
    const title = 'Usuario'

    let topMenu = (
        <TopMenu auth={ props.auth } title={ title } show={['home', 'user-add']} />
    )

    function toggleActive() {
        const d = { ...data }
        d.active = !d.active

        setData(d)
    }

    function updateForm(e, field) {
        const d = { ...data }
        d[field] = e.target.value

        setData(d)
    }

    function submit(e) {
        post(route('user.save'), {
            onFinish: () => console.log(''),
        });
        e.preventDefault();
    }

    return (
        <AuthenticatedLayout auth={ props.auth } user={ props.auth.user } header={ false } topMenu={ topMenu }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="">
                        <label htmlFor="name" className="mr-2">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={ (e) => updateForm(e, 'name') }
                            className="w-1/2"
                            placeholder="nombre del usuario"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="email" className="mr-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={ (e) => updateForm(e, 'email') }
                            className="w-1/2"
                            placeholder="email"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="active" className="mr-2">active</label>
                        <Checkbox
                            name="active"
                            checked={data.active}
                            onChange={ toggleActive }
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            onClick={ submit }
                            className="border border-black shadow rounded-lg p-2 bg-blue-400"
                        >
                            GUARDAR
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
