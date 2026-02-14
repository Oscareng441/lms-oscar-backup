import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LessonDescription from "@/Components/LessonDescription";
import TopMenu from "@/Components/TopMenu";
import Checkbox from "@/Components/Checkbox";
import { router, Link, Head, useForm } from "@inertiajs/react";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import { GoGrabber } from "react-icons/go";
import { buildBreadCrumbs } from "@/Helpers/Utilities";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const Edit = ({ auth, origLessons, origChapter, course, origKeywords = [] }) => {
    const [chapter, setChapter] = useState(origChapter);
    const [lessons, setLessons] = useState(origLessons);
    const [keywords, setKeywords] = useState(origKeywords.join(' '));
    const [reordered, setReordered] = useState(false);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    const { data, setData, post } = useForm({
        chapter: origChapter,
        lessons: origLessons,
        deletedLessons: [],
    });

    const sqForm = useForm({ sq: [] });

    useEffect(() => {
        let s = [];
        lessons.forEach((p, k) => {
            s.push({ id: p.id, sequence_id: 10 * (k + 1) });
        });
        sqForm.setData({ sq: s });
    }, [lessons]);

    useEffect(() => {
        if (reordered) {
            sqForm.post(route("lesson.recordSeqId"), {
                preserveScroll: true,
            });
            setReordered(false);
        }
    }, [sqForm.data]);

    const title = `Edita Capítulo ${chapter.name}`;

    const changeChapterName = (e) => {
        let nm = e.target.value;
        let c = { ...chapter };
        c.name = nm;
        setChapter(c);
        data.chapter = c;
        setData(data);
    };

    const changeChapterShortName = (e) => {
        let nm = e.target.value;
        let c = { ...chapter };
        c.short_name = nm;
        setChapter(c);
        data.chapter = c;
        setData(data);
    };
    const togglePublishChapter = () => {
        let c = { ...chapter };
        c.active = !c.active;
        setChapter(c);
        data.chapter = c;
        setData(data);
    };
    const deleteChapter = () => {};
    const changeLessonName = (e, k) => {
        let nm = e.target.value;
        let c = [...lessons];
        c[k].name = nm;
        c[k].changed = true;
        setLessons(c);
        data.lessons = c;
        setData(data);
    };
    const togglePublishLesson = (e, k) => {
        let c = [...lessons];
        c[k].active = !c[k].active;
        c[k].changed = true;
        setLessons(c);
        data.lessons = c;
        setData(data);
    };
    const deleteLesson = (e, k) => {
        let c = [...lessons];
        let r = c.splice(k, 1);
        setLessons(c);
        data.lessons = c;
        data.deletedLessons.push(r[0].id);
        setData(data);
    };
    const addLesson = () => {
        let c = [...lessons];
        c.push({
            lesson_set_id: chapter.id,
            sequence_id: (c.length + 1) * 10,
            name: "",
            active: 0,
        });
        setLessons(c);
        data.lessons = c;
        setData(data);
    };

    const manageKeywords = (e) => {
        let k = e.target.value;
        setKeywords(k)
        let d = {...data}
        d.keywords = k;
        setData(d)
    };

    const save = () => {
        post(route("chapter.save"), { data: data });
    };

    const breadcrumbs = buildBreadCrumbs({ course }, 2);

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            courseId={chapter.course_id}
            chapterId={chapter.id}
            show={["home", "course", "chapter"]}
            breadcrumbs={breadcrumbs}
        />
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setReordered(true);
            setLessons((lessons) => {
                let oldIndex = -1;
                let newIndex = -1;
                lessons.some((x, k) => {
                    if (x.id === active.id) {
                        oldIndex = k;
                        return true;
                    }
                    return false;
                });
                lessons.some((x, k) => {
                    if (x.id === over.id) {
                        newIndex = k;
                        return true;
                    }
                    return false;
                });
                return arrayMove(lessons, oldIndex, newIndex);
            });
        }
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
        >
            <Head title={title} />
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center">
                            <div className=""> Nombre del Capítulo:</div>
                            <div className="flex items-center mx-2">
                                <Checkbox
                                    checked={chapter.active}
                                    onChange={togglePublishChapter}
                                    className="border border-black border-1"
                                />
                                <div className="text-sm ml-1 mr-2">
                                    Publicar
                                </div>
                                <FaTrash
                                    className="text-base ml-2 cursor-pointer"
                                    onClick={deleteChapter}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                onChange={changeChapterName}
                                value={chapter.name}
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
                                onChange={changeChapterShortName}
                                value={chapter.short_name}
                                className="w-full"
                                maxLength={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <div className="flex items-center">
                            {" "}
                            Lecciones:{" "}
                            <FaPlus
                                className="text-base ml-2 cursor-pointer"
                                onClick={addLesson}
                            />
                        </div>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={lessons}
                                strategy={verticalListSortingStrategy}
                            >
                                {lessons.map((c, k) => {
                                    let lessonName = c.name;
                                    return (
                                        <LessonRow
                                            key={k}
                                            idx={k}
                                            lesson={c}
                                            changeLessonName={changeLessonName}
                                            togglePublishLesson={
                                                togglePublishLesson
                                            }
                                        />
                                    );
                                })}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </div>
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
        </AuthenticatedLayout>
    );
};

function LessonRow(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.lesson.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div
                className={`flex flex-row justify-space items-center my-8 w-full `}
            >
                <GoGrabber className="cursor-grab" />
                <input
                    key={props.idx}
                    type="text"
                    onChange={(e) => props.changeLessonName(e, props.idx)}
                    value={props.lesson.name}
                    className="w-full"
                />
                <Checkbox
                    checked={props.lesson.active}
                    onChange={(e) => props.togglePublishLesson(e, props.idx)}
                    className="border border-black border-1"
                />
                <div className="text-sm ml-1 mr-2">P</div>
                {props.lesson.id && (
                    <a href={`/lesson/${props.lesson.id}/edit`}>
                        <FaPencilAlt className="text-base ml-2" />
                    </a>
                )}
                {props.lesson.id == null && (
                    <FaPencilAlt className="text-base ml-2 text-slate-400" />
                )}
                <FaTrash
                    className="text-base ml-2 cursor-pointer"
                    onClick={(e) => deleteLesson(e, props.idx)}
                />
            </div>
        </div>
    );
}

export default Edit;
