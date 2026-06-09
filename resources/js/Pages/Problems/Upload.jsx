import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link, Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TopMenu from "@/Components/TopMenu";
import { buildBreadCrumbs } from "@/Helpers/Utilities";

const Upload = ({ auth, lesson, chapter, course }) => {
    console.log(lesson, chapter);
    const { data, setData, errors, post, processing } = useForm({
        problem: "",
    });
    const sbm = (e) => {
        e.preventDefault();
        post(route("lesson.uploadProblem.submit", lesson.id));
    };
    const hlp = () => {
        let d = { ...data };
        d.problem =
            "texto del problema, ejemplo 3 + 3\ntipo de respuesta(s=opción multiple sencillo, m=opción multiple, o=abierto, n=numérico )\n\nrespuesta1, 1 o 0 (1 significa correcto)\nrespuesta2\n...\n\npista1\npista2\n...";
        setData(d);
    };
    const clean = () => {
        let d = { ...data };
        d.problem = "";
        setData(d);
    };
    const updateForm = (e) => {
        let d = { ...data };
        d.problem = e.target.value;
        setData(d);
    };
    const breadcrumbs = buildBreadCrumbs({ course, chapter, lesson }, 4);
    let topMenuIcons = ["home", "prob-set", "prob-add"];
    let topMenu = (
        <TopMenu
            auth={auth}
            title="Subir Problema"
            lessonId={lesson.id}
            show={topMenuIcons}
            breadcrumbs={breadcrumbs}
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
                    <textarea
                        value={data.problem}
                        onChange={updateForm}
                        className="w-full h-96"
                        placeholder="tecla el problema"
                    />
                    <InputError message={errors.problem} className="mt-2" />
                    <div className="flex justify-end">
                        <PrimaryButton
                            className="mx-1"
                            type="submit"
                            onClick={sbm}
                        >
                            subir
                        </PrimaryButton>
                        <SecondaryButton className="mx-1" onClick={hlp}>
                            ayuda
                        </SecondaryButton>
                        <SecondaryButton className="mx-1" onClick={clean}>
                            limpiar
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Upload;
