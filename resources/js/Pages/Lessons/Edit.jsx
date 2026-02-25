import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LessonDescription from "@/Components/LessonDescription";
import TopMenu from "@/Components/TopMenu";
import Checkbox from "@/Components/Checkbox";
import { router, Link, Head, useForm } from "@inertiajs/react";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { buildBreadCrumbs } from "@/Helpers/Utilities";

const Edit = ({ auth, origLesson, chapter, course, origKeywords = [] }) => {
    const [lesson, setLesson] = useState(origLesson);
    const [keywords, setKeywords] = useState(origKeywords.join(' '));
    const { data, setData, post } = useForm({
        lesson: origLesson,
        file: null,
        keywords: keywords,
    });

    const title = `Capítulo ${lesson.name}`;

    const changeLessonName = (e) => {
        let nm = e.target.value;
        let c = { ...lesson };
        c.name = nm;
        setLesson(c);
        data.lesson = c;
        setData(data);
    };

    const changeLessonShortName = (e) => {
        let nm = e.target.value;
        let c = { ...lesson };
        c.short_name = nm;
        setLesson(c);
        data.lesson = c;
        setData(data);
    };
    const togglePublishLesson = () => {
        let c = { ...lesson };
        c.active = !c.active;
        setLesson(c);
        data.lesson = c;
        setData(data);
    };
    const deleteLesson = () => {
        if (confirm("Seguro que quiere borrar la lección y todo su contenido?")) {
            fetch(route('lesson.delete', {id: lesson.id}))
            .then(() => {
                window.location.href = `/chapter/${lesson.lesson_set_id}/edit`;
            });
        }
    };
    const deleteLessonPage = () => {
        let c = { ...lesson };
        c.lesson_page = "";
        setLesson(c);
        data.lesson = c;
        data.file = null;
        setData(data);
    };
    const changeLessonText = (e) => {
        let c = { ...lesson };
        c.lesson_text = e.target.value;
        setLesson(c);
        data.lesson = c;
        setData(data);
    };
    const changeLessonFile = (e) => {
        let c = { ...lesson };
        c.lesson_page = e.target.files[0].name;
        setLesson(c);
        data.lesson = c;
        data.file = e.target.files[0];
        setData(data);
    };
    const changeLessonDisplayType = (t) => {
        let val = t;
        let c = { ...lesson };
        c.lesson_type = val;
        setLesson(c);
        data.lesson = c;
        setData(data);
    };

    let lessonDisplayTypeSelector = ["text", "pdf", "hybrid", "latex"].map(
        (t) => {
            let sel = t === lesson.lesson_type ? "font-bold" : "text-slate-500";
            return (
                <div
                    key={t}
                    className={`cursor-pointer text-sm mx-1 ${sel}`}
                    onClick={() => changeLessonDisplayType(t)}
                >
                    {t}
                </div>
            );
        },
    );

    const manageKeywords = (e) => {
        let k = e.target.value;
        setKeywords(k)
        let d = {...data}
        d.keywords = k;
        setData(d)
    };

    const save = () => {
        post(route("lesson.save"));
    };

    const breadcrumbs = buildBreadCrumbs({ course, chapter }, 3);

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            courseId={course.id}
            lessonId={lesson.id}
            chapterId={lesson.lesson_set_id}
            show={["home", "lesson", "chapter"]}
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
            <Head title={title} />
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-2">
                <TabGroup>
                    <TabList className="flex gap-4">
                        <Tab className="aria-selected:underline hover:bg-slate-300">
                            Titulo
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300">
                            Texto
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300">
                            Recursos
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="py-2">
                                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        <div className="flex items-center">
                                            <div className="">
                                                {" "}
                                                Nombre de Lección:
                                            </div>
                                            <div className="flex items-center mx-2">
                                                <Checkbox
                                                    checked={lesson.active}
                                                    onChange={
                                                        togglePublishLesson
                                                    }
                                                    className="border border-black border-1"
                                                />
                                                <div className="text-sm ml-1 mr-2">
                                                    Publicar
                                                </div>
                                                <FaTrash
                                                    className="text-base ml-2 cursor-pointer"
                                                    onClick={deleteLesson}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                onChange={changeLessonName}
                                                value={lesson.name}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        Nombre Corto
                                        <div>
                                            <input
                                                type="text"
                                                onChange={changeLessonShortName}
                                                value={lesson.short_name}
                                                className="w-full"
                                                maxLength={30}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="py-2">
                                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        <div className="flex items-center">
                                            <div className="text-left">
                                                {" "}
                                                Contenido:
                                            </div>
                                            <div className="flex items-center mx-2">
                                                {lessonDisplayTypeSelector}
                                            </div>
                                        </div>
                                        <div className="">
                                            {lesson.lesson_type !== "pdf" && (
                                                <textarea
                                                    rows="15"
                                                    onChange={changeLessonText}
                                                    className="w-full"
                                                    value={lesson.lesson_text}
                                                />
                                            )}
                                            {lesson.lesson_type === "pdf" &&
                                                lesson.lesson_page && (
                                                    <div className="flex flex-row justify-center">
                                                        <div>
                                                            {lesson.lesson_page}
                                                        </div>
                                                        <FaTrash
                                                            className="text-base ml-2 cursor-pointer"
                                                            onClick={
                                                                deleteLessonPage
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            {lesson.lesson_type === "pdf" &&
                                                !lesson.lesson_page && (
                                                    <div className="flex flex-row justify-center">
                                                        <div>
                                                            <input
                                                                type="file"
                                                                className="w-full"
                                                                placeholder="pdf"
                                                                onChange={
                                                                    changeLessonFile
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mx-auto max-w-7xl space-y-6 pt-2">
                                <div className="text-center bg-white p-1 shadow w-full sm:rounded-lg sm:p-8 flex items-center">
                                    <div className="text-left text-2xl"> Palabras Claves:</div>
                                    <div>
                                        <input
                                            type="text"
                                            onChange={manageKeywords}
                                            value={keywords}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
                <div className="py-2">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div
                            className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8 cursor-pointer"
                            onClick={save}
                        >
                            SAVE
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
