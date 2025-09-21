import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function SchoolForm({school, afterSubmit}) {
    const { data, setData, errors, post } = useForm({
        id: school.id,
        name: school.name,
        active: school.active,
    })

    function updateForm(e, field) {
        const d = { ...data }
        d[field] = e.target.value

        setData(d)
    }

    function toggleActive() {
        const d = { ...data }
        d.active = !d.active

        setData(d)
    }

    function submit(e) {
        post(route('school.save'), {
            onSuccess: (c) => {
                afterSubmit(c.props.flash.success)
            }
        });
        e.preventDefault();
    }

    return (
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
                        placeholder="nombre de la escuela"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="">
                    <label htmlFor="active" className="mr-2">Vigente</label>
                    <Checkbox
                        name="active"
                        checked={data.active}
                        onChange={ toggleActive }
                    />
                </div>
                    <InputError message={errors.active} className="mt-2" />
                <div className="">
                    <button
                        type="submit"
                        onClick={ submit }
                        className="mx-2 btn btn-primary"
                    >
                        GUARDAR
                    </button>
                </div>
            </div>
        </div>
    )
}
