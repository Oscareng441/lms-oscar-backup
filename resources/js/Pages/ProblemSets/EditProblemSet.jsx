import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ShowProblem from "@/Components/ShowProblem";
import TopMenu from "@/Components/TopMenu";
import FeedbackComponent from "@/Components/FeedbackComponent";
import EndOfSet from "@/Components/EndOfSet";
import HybridDisplay from "@/Components/HybridDisplay";
import FillInTheBlanksDisplay from "@/Components/FillInTheBlanksDisplay";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { usePage, Link, Head } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
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

const EditProblemSet = ({ auth, problems, lesson, answers, hints }) => {
    const [probs, setProbs] = useState(problems);
    const [probsReordered, setProbsReordered] = useState(false);
    let { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({ sq: [] });
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8, // drag starts after moving 8px
        },
      }),
      useSensor(KeyboardSensor)
    );

    useEffect(() => {
        let s = [];
        probs.forEach((p, k) => {
            s.push({ id: p.id, sequence_id: 10 * (k + 1) });
        });
        setData({ sq: s });
    }, [probs]);

    useEffect(() => {
        if (probsReordered) {
            post(route("problem.recordSeqId"));
        }
    }, [data]);

    const title = `${lesson.name} Ejercicios`;

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            lessonId={lesson.id}
            show={["home", "lesson", "prob-add"]}
        />
    );

    const deleteProblem = (p, k) => {
        if (confirm("Borrar de verdad?")) {
            fetch(route("problem.delete", { id: p.id }))
                .then((res) => res.json())
                .then(
                    (success) => {
                        console.log(success);
                        flash = success;
                    },
                    (error) => {
                        console.log("error", error);
                        flash = error;
                    },
                );
            let probsTmp = [...probs];
            probsTmp.splice(k, 1);
            setProbs(probsTmp);
        }
    };

    const togglePublish = (p, k) => {
        fetch(route("problem.publish", { id: p.id, deactivate: p.active }));
        let probsTmp = [...probs];
        probsTmp[k].active = !probsTmp[k].active;
        setProbs(probsTmp);
    };

    function handleDragEnd(event) {
        const { active, over } = event;
        if ('id' in active && 'id' in over && active.id !== over.id) {
            setProbsReordered(true);
            setProbs((probs) => {
                let oldIndex = -1;
                let newIndex = -1;
                probs.some((x, k) => {
                    if (x.id === active.id) {
                        oldIndex = k;
                        return true;
                    }
                    return false;
                });
                probs.some((x, k) => {
                    if (x.id === over.id) {
                        newIndex = k;
                        return true;
                    }
                    return false;
                });
                return arrayMove(probs, oldIndex, newIndex);
            });
        }
    }

    const probList = probs.map((p, k) => {
        let problemSection;
        if (p.display_type === "text") {
            //deprecate
            problemSection = (
                <div dangerouslySetInnerHTML={{ __html: p.problem_text }} />
            );
        }
        if (p.display_type === "html") {
            problemSection = (
                <div dangerouslySetInnerHTML={{ __html: p.problem_text }} />
            );
        }
        if (p.display_type === "latex") {
            problemSection = <Latex>{p.problem_text}</Latex>;
        }
        if (p.display_type === "pdf") {
            problemSection = (
                <iframe
                    src={`/storage/${pageAssets.pdf}.pdf`}
                    style={{ width: "900px", height: "1200px" }}
                    frameBorder="0"
                />
            );
        }
        if (p.display_type === "hybrid") {
            problemSection = <HybridDisplay content={p.problem_text} />;
        }
        if (p.display_type === "ranuras") {
            problemSection = (
                <FillInTheBlanksDisplay content={p.problem_text} />
            );
        }
        return (
            <ProbRow
                key={k}
                idx={k}
                prob={p}
                problemSection={problemSection}
                togglePublish={togglePublish}
                deleteProblem={deleteProblem}
            />
        );
    });

    function toggleUnpub() {
        setProbs(problems.filter((x) => {
            return x.active === 0;
        }))
    }

    function togglePub() {
        setProbs(problems.filter((x) => {
            return x.active === 1;
        }))
    }

    function toggleAll() {
        setProbs(problems)
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
        >
            <Head title={title} />
            <div className="py-2 px-4">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-sm sm:text-md flex">
                        <p className="text-green-600">
                            <Link href={route("problemset.student", lesson.id)}>
                                Go to student mode
                            </Link>
                        </p>
                        <div className="cursor-pointer ml-8" onClick={toggleUnpub}>
                            Solo No Publicados
                        </div>
                        <div className="cursor-pointer ml-8" onClick={togglePub}>
                            Solo Publicados
                        </div>
                        <div className="cursor-pointer ml-8" onClick={toggleAll}>
                            Todos
                        </div>
                    </div>
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={probs}
                                strategy={verticalListSortingStrategy}
                            >
                                {probList}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

function ProbRow(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.prob.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const [prob, setProb] = useState(props.prob);

    useEffect(() => {
        setProb(props.prob)
    }, [props])
console.log(props)
    function togPub(e) {
        let p = {...prob}
        props.togglePublish(prob, props.idx);
        p.active = !p.active;
        setProb(p);
    }

    function delProb(a,b) {
        console.log(a,b);
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`flex flex-row justify-space items-center my-8 w-full overflow-y-scroll`}
        >
            <div className="text-sm cursor-grab">{props.prob.name}</div>
            <div className="text-center bg-white p-1 m-2 shadow text-2xl sm:rounded-lg sm:p-2 border border-slate-200">
                <Link href={route("problem.show", props.prob.id)}>
                    {props.problemSection}
                </Link>
            </div>
            <div className="flex items-center mx-2">
                <Link href={route("problem.edit", props.prob.id)}>
                    <FaPencilAlt className="text-base mx-4 cursor-pointer" />
                </Link>
                <Checkbox
                    checked={prob.active}
                    onChange={togPub}
                    className="border border-black border-1"
                />
                <div className="text-sm ml-1 mr-2">Publicar</div>
                <FaTrash
                    className="text-base ml-2 cursor-pointer"
                    onClick={() => props.deleteProblem(props.prob, props.idx)}
                />
            </div>
        </div>
    );
}

export default EditProblemSet;
