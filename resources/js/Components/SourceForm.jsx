import Checkbox from "@/Components/Checkbox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function SourceForm({ source, afterSubmit }) {
    const { data, setData, errors, post } = useForm({
        id: source.id,
        name: source.name,
        author: source.author,
        source_date: source.source_date,
        source_name: source.source_name,
        active: source.active,
    });

    function updateForm(e, field) {
        const d = { ...data };
        d[field] = e.target.value;

        setData(d);
    }

    function toggleActive() {
        const d = { ...data };
        d.active = !d.active;

        setData(d);
    }

    function submit(e) {
        post(route("source.save"), {
            onSuccess: (c) => {
                // addToOpts(c)
                afterSubmit(c.props.flash.success);
            },
        });
        e.preventDefault();
    }

    return (
        <div className="py-2">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="">
                    <label htmlFor="name" className="mr-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => updateForm(e, "name")}
                        className="w-1/2"
                        placeholder="nombre del usuario"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="">
                    <label htmlFor="author" className="mr-2">
                        Autor
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={data.author}
                        onChange={(e) => updateForm(e, "author")}
                        className="w-1/2"
                        placeholder="author"
                    />
                    <InputError message={errors.author} className="mt-2" />
                </div>
                <div className="">
                    <label htmlFor="source_date" className="mr-2">
                        Fecha
                    </label>
                    <input
                        type="text"
                        id="source_date"
                        value={data.source_date}
                        onChange={(e) => updateForm(e, "source_date")}
                        className="w-1/2"
                        placeholder="source_date"
                    />
                    <InputError message={errors.source_date} className="mt-2" />
                </div>
                <div className="">
                    <label htmlFor="source_name" className="mr-2">
                        Fuente
                    </label>
                    <input
                        type="text"
                        id="source_name"
                        value={data.source_name}
                        onChange={(e) => updateForm(e, "source_name")}
                        className="w-1/2"
                        placeholder="source_name"
                    />
                    <InputError message={errors.source_name} className="mt-2" />
                </div>
                <div className="">
                    <label htmlFor="active" className="mr-2">
                        Vigente
                    </label>
                    <Checkbox
                        name="active"
                        checked={data.active}
                        onChange={toggleActive}
                    />
                </div>
                <InputError message={errors.active} className="mt-2" />
                <div className="">
                    <button
                        type="submit"
                        onClick={submit}
                        className="mx-2 btn btn-primary"
                    >
                        GUARDAR
                    </button>
                </div>
            </div>
        </div>
    );
}
