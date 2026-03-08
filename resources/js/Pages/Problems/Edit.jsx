import { useState, useEffect } from "react";
import Select from "react-select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link, Head } from "@inertiajs/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import Checkbox from "@/Components/Checkbox";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import ShowProblem from "@/Components/ShowProblem";
import TopMenu from "@/Components/TopMenu";
import CourseSelect from "@/Components/CourseSelect";
import FeedbackComponent from "@/Components/FeedbackComponent";
import HintComponent from "@/Components/HintComponent";
import AnswerTypeSelector from "@/Components/AnswerTypeSelector";
import InputError from "@/Components/InputError";
import CreditsComponent from "@/Components/CreditsComponent";
import ImageGalleryComponent from "@/Components/ImageGalleryComponent";
import { handleFraction, buildBreadCrumbs } from "@/Helpers/Utilities";

const Edit = ({
    auth,
    origProblem,
    origAnswers,
    origHints,
    courses,
    origCourseId,
    origChapterId,
    origLessonId,
    lesson,
    chapter,
    course,
    images,
    credits = [],
    problemIds = [],
    origKeywords = [],
}) => {
    const [probTxt, setProbTxt] = useState(origProblem.problem_text);
    const [probDisplayType, setProbDisplayType] = useState(
        origProblem.display_type,
    );
    const [probType, setProbType] = useState(origProblem.problem_type_id);
    const [probPublished, setProbPublished] = useState(origProblem.active);
    const [creditId, setCreditId] = useState(origProblem.credit_id || 0);
    const [problem, setProblem] = useState(origProblem);
    const [answers, setAnswers] = useState(origAnswers);
    const [hints, setHints] = useState(origHints || []);
    const [courseId, setCourseId] = useState(origCourseId);
    const [chapterId, setChapterId] = useState(origChapterId);
    const [lessonId, setLessonId] = useState(origLessonId);
    const [keywords, setKeywords] = useState(origKeywords.join(' '));
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [points, setPoints] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [hintsToShow, setHintsToShow] = useState(1);
    const [tolerance, setTolerance] = useState(
        origAnswers[0]?.pct_tolerance || 0,
    );
    const { data, setData, post, errors } = useForm({
        problem: problem,
        answers: answers,
        hints: hints || [],
        lessonId: lessonId,
    });
    const isAdd = window.location.pathname.split("/").pop() === "add-problem";

    useEffect(() => {
        let p = { ...problem };
        let d = { ...data };
        p.problem_text = probTxt;
        p.problem_type_id = probType;
        p.display_type = probDisplayType;
        p.active = probPublished;
        p.lesson_id = lessonId;
        p.credit_id = creditId;
        setProblem(p);
        d.problem = p;
        setData(d);
    }, [probTxt, probDisplayType, probType, probPublished, lessonId, creditId]);

    useEffect(() => {
        if (probDisplayType == 5) {
            setProbType("ranuras");
        }
    }, [probDisplayType]);

    const title = !isAdd ? `Editar #${problem.id}` : "Problema Nuevo";

    const genericAnswer = (a) => {
        return {
            problem_id: problem.id,
            sequence_id: (a.length + 1) * 10,
            answer_text: "",
            is_correct: 0,
            display_type: "latex",
        };
    };

    const nextProblem = () => {
        window.location.href = "/problem/" + problemIds.siguiente + "/edit";
    };

    const prevProblem = () => {
        window.location.href = "/problem/" + problemIds.anterior + "/edit";
    };

    const toggleShowHint = () => {
        setShowFeedback(false);
        setShowHint(!showHint);
    };

    const nextHint = () => {
        setHintsToShow(hintsToShow + 1);
    };

    const prevHint = () => {
        setHintsToShow(hintsToShow - 1);
    };

    const handleAnswer = (id, points, msg) => {
        setFeedbackMessage(msg);
        setShowFeedback(true);
        setPoints(points);
    };

    const closeFeedbackModal = () => {
        setShowFeedback(false);
    };

    const closeHintModal = () => {
        setShowHint(false);
    };

    const closeGalleryModal = () => {
        setShowGallery(false);
    };

    const chgProbTxt = (e) => {
        setProbTxt(e.target.value);
    };

    const chgProbName = (e) => {
        let p = { ...problem };
        let d = { ...data };
        p.name = e.target.value;
        setProblem(p);
        d.problem = p;
        setData(d);
    };

    const blurProbTxt = (e) => {
        if (probType === 5) {
            let arr = e.target.value.split("_");
            let orderedAnswers = [];
            arr.forEach((a, k) => {
                if (k % 2) {
                    orderedAnswers.push(a);
                }
            });
            console.log(orderedAnswers);
            handleRanuraRightAnswers(orderedAnswers);
        }
    };

    function handleRanuraRightAnswers(arr) {
        let ansrs = [];
        answers.forEach((a) => {
            if (!(a.is_auto && a.is_auto == 1)) {
                ansrs.push(a);
            }
        });
        arr.some((autoAnswer, k) => {
            let addMe = true;
            ansrs.forEach((a) => {
                if (a.answer_text === autoAnswer) {
                    addMe = false;
                    return true;
                }
                return false;
            });
            if (addMe) {
                let ans = {
                    problem_id: problem.id,
                    answer_text: autoAnswer,
                    is_correct: 1,
                    slot: k + 1,
                    is_auto: 1,
                    display_type: "latex",
                };
                ansrs.push(ans);
            }
        });

        setAnswers(ansrs);
    }

    const chgAnsTxt = (e, k) => {
        let txt = e.target.value;
        let a = [...answers];
        a[k].answer_text = txt;
        setAnswers(a);
        data.answers = a;
        setData(data);
    };

    const handleAnswerBlur = (e, k) => {
        if (probType === 3 || probType === 4) {
            let a = [...answers];
            a[k].is_correct = true;
            if (probType === 4) {
                a[k].answer_text = handleFraction(e.target.value);
            }
            setAnswers(a);
            data.answers = a;
            setData(data);
        }
    };

    const chgAnsCorrect = (e, k) => {
        let a = [...answers];
        a[k].is_correct = !a[k].is_correct;
        setAnswers(a);
        data.answers = a;
        setData(data);
    };

    const chgAnsUseLatex = (e, k) => {
        let a = [...answers];
        console.log(a[k].display_type)
        a[k].display_type = a[k].display_type === 'latex' ? 'text' : 'latex';
        setAnswers(a);
        data.answers = a;
        setData(data);
    };

    const addAns = () => {
        let a = [...answers];
        if (probType === 4 && a.length > 0) {
            return;
        }
        a.push(genericAnswer(a));
        setAnswers(a);
        data.answers = a;
        setData(data);
    };

    const delAns = (e, k) => {
        let a = [...answers];
        a.splice(k, 1);
        setAnswers(a);
        data.answers = a;
        setData(data);
    };

    const chgHintTxt = (e, k) => {
        let txt = e.target.value;
        let h = [...hints];
        h[k].hint = txt;
        setHints(h);
        data.hints = h;
        setData(data);
    };

    const addHint = () => {
        let h = [...hints];
        h.push({
            problem_id: problem.id,
            sequence_id: (h.length + 1) * 10,
            hint: "",
        });
        setHints(h);
        data.hints = h;
        setData(data);
    };

    const delHint = (e, k) => {
        let h = [...hints];
        h.splice(k, 1);
        setHints(h);
        data.hints = h;
        setData(data);
    };

    function updateId(r) {
        let id = r.props.origProblem.id
        let d = { ...data }
        d.problem.id = id
        setData(d)
    }

    function save() {
        post(route('problem.save'), {
            onError: (err) => {console.log('err')},
            onSuccess: updateId,
            preserveScroll: true,
        });
    }

    const selectCourse = (e) => {
        setCourseId(e.value);
    };

    const selectChapter = (e) => {
        setChapterId(e.value);
    };

    const selectLesson = (e) => {
        setLessonId(e.value);
    };

    const changeProblemDisplayType = (t) => {
        setProbDisplayType(t);
        if (t === "ranuras") {
            setProbType(5);
        }
    };

    const changeProblemType = (t) => {
        setProbType(t);
        if (t === 4) {
            let a = [...answers];
            a.push(genericAnswer(a));
            a = [a[0]];
            setAnswers(a);
            let d = { ...data };
            d.answers = a;
            setData(d);
        }
    };

    const togglePublish = () => {
        setProbPublished(!probPublished);
    };

    const chgTolerance = (e) => {
        setTolerance(e.target.value);
    };

    const validateTolerance = () => {
        let t = tolerance;
        if (t > 1) {
            t = t / 100;
        }
        if (t > 1 || t < 0) {
            t = 0;
        }
        setTolerance(t);
        let a = [...answers];
        a[0].pct_tolerance = t;
        setAnswers(a);
        let d = { ...data };
        d.answers = a;
        setData(d);
        console.log(p, d);
    };

    const updateCredit = (credId) => {
        setCreditId(credId);
    };

    const toggleShowGallery = () => {
        setShowGallery(!showGallery);
    };

    const manageKeywords = (e) => {
        let k = e.target.value;
        setKeywords(k)
        let d = {...data}
        d.keywords = k;
        setData(d)
    };

    const deleteProblem = () => {
        if (confirm("Really delete this problem?")) {
            fetch(route("problem.delete", { id: problem.id }));
        }
    };

    const breadcrumbs = buildBreadCrumbs({ course, chapter, lesson }, 4);
    let topMenuIcons = ["home", "prob-set"];
    if (!isAdd) {
        topMenuIcons.push("prob-add");
        topMenuIcons.push("prob-dup");
    } else {
        topMenuIcons.push("prob-add-alt");
    }
    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            lessonId={lessonId}
            problemId={problem.id}
            show={topMenuIcons}
            breadcrumbs={breadcrumbs}
        />
    );

    let problemDisplayTypeSelector = [
        "latex",
        "html",
        "híbrido",
        "ranuras",
    ].map((t) => {
        let sel = t === probDisplayType ? "font-bold" : "text-slate-500";
        return (
            <div
                key={t}
                className={`cursor-pointer text-xs sm:text-sm mx-1 ${sel}`}
                onClick={() => changeProblemDisplayType(t)}
            >
                {t}
            </div>
        );
    });

    let problemTypeSelector = [
        "single MC",
        "multiple MC",
        "text",
        "numeric",
        "ranuras",
    ].map((t, k) => {
        let key = k + 1;
        let sel = key === probType ? "font-bold" : "text-slate-500";
        return (
            <div
                key={t}
                className={`cursor-pointer text-xs sm:text-sm mx-1 ${sel}`}
                onClick={() => changeProblemType(key)}
            >
                {t}
            </div>
        );
    });

    const toleranceSelection = (
        <div className="py-2">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="flex items-center">
                        Tolerancia:
                        <input
                            placeholder="Tolerancia (.01 por ejemplo, si la respuesta cuenta como correcto si está adentro de 1%)"
                            type="text"
                            onChange={chgTolerance}
                            onBlur={validateTolerance}
                            value={tolerance}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const addImageToProb = (imgU) => {
        let prob = { ...problem };
        let txt = prob.problem_text;
        let imgTag =
            '<img src="' + imgU.replace("/thumbs", "") + "\" alt='image'/>";
        if (prob.display_type === "latex") {
            prob.display_type = "hybrid";
            setProblem(prob);
            txt = "[LLL] " + txt;
        }
        if (prob.display_type === "hybrid") {
            txt = txt + " [HHH] " + imgTag;
        } else {
            txt = txt + imgTag;
        }
        toggleShowGallery();
        setProbTxt(txt);
    };

    let errMsg = "";
    for (let i in errors) {
        errMsg = errMsg + errors[i];
    }

    let probTextInstructionsTxt = "",
        placeholder = "";
    switch (probDisplayType) {
        case "ranuras":
            probTextInstructionsTxt =
                'tecla dos o más guiones bajos para una ranura, como "_No_ tengo _piano_"';
            break;
        default:
            probTextInstructionsTxt = "";
    }
    let probTextInstructions = (
        <div className="">{probTextInstructionsTxt}</div>
    );

    let answerBlurbMsg = "";
    switch (probType) {
        case 3:
            answerBlurbMsg =
                "Ingresa todas las formas que aceptas como correctos. Por ejemplo, una respuesta de JLo, otra de Jennifer Lopez si aceptas los 2";
            break;
        case 4:
            answerBlurbMsg = "Solo una respuesta";
            break;
        case 5:
            answerBlurbMsg = "Solo agrega distractores. Las respuestas no";
            break;
        default:
    }
    let answerBlurb =
        answerBlurbMsg === "" ? "" : <div className="">{answerBlurbMsg}</div>;

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
        >
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 py-2">
                <TabGroup className="mx-auto w-full">
                    <TabList className="flex gap-4 bg-white">
                        <Tab className="aria-selected:underline hover:bg-slate-300 p-1">
                            Vista Estudiantil
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300 p-1">
                            Capturar el Problema
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300 p-1">
                            Respuestas
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300 p-1">
                            Pistas
                        </Tab>
                        <Tab className="aria-selected:underline hover:bg-slate-300 p-1">
                            Recursos
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {problem !== null && (
                                <ShowProblem
                                    problem={problem}
                                    answers={answers}
                                    handleAnswer={handleAnswer}
                                    showHint={showHint}
                                    hint={toggleShowHint}
                                    totalHints={hints.length}
                                    hintsToShow={hintsToShow}
                                    nextHint={nextHint}
                                    next={nextProblem}
                                    prev={prevProblem}
                                    hasNextProblem={
                                        problemIds.siguiente !== null
                                    }
                                    hasPrevProblem={
                                        problemIds.anterior !== null
                                    }
                                    editMode={true}
                                    answered={false}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            <div className="">
                                <div className="mx-auto max-w-7xl space-y-6 ">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        <div className="flex items-center">
                                            <div className="text-sm sm:text-md">
                                                La Pregunta:
                                            </div>
                                            <div className="flex items-center mx-2">
                                                {problemDisplayTypeSelector}
                                            </div>
                                            <div className="flex items-center mx-2">
                                                <Checkbox
                                                    checked={probPublished}
                                                    onChange={togglePublish}
                                                    className="border border-black border-1"
                                                />
                                                <div className="text-xs sm:text-sm ml-1 mr-2">
                                                    Publicar
                                                </div>

                                                <GrGallery
                                                    className="text-base mx-2 cursor-pointer"
                                                    onClick={toggleShowGallery}
                                                    title="galería de imágenes"
                                                />
                                                <FaTrash
                                                    className="text-base ml-2 cursor-pointer"
                                                    onClick={deleteProblem}
                                                    title="borrar problema"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            {probTextInstructions}
                                        </div>
                                        <textarea
                                            type="text"
                                            onChange={chgProbTxt}
                                            onBlur={blurProbTxt}
                                            value={probTxt}
                                            className="w-full h-fit"
                                            rows={10}
                                        />
                                    </div>
                                    <InputError
                                        message={errMsg}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mx-auto max-w-7xl space-y-6">
                                    <div className="text-center bg-white p-1 shadow w-full sm:rounded-lg sm:p-8 flex items-center">
                                        <div className="mr-2">Name:</div>
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                onChange={chgProbName}
                                                value={problem.name}
                                                className="w-full"
                                            />
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
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="">
                                <div className="mx-auto max-w-7xl space-y-6 ">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        <div className="flex items-center">
                                            <div className="text-sm sm:text-md">
                                                Distractores:
                                            </div>
                                            <div className="flex items-center mx-2">
                                                <AnswerTypeSelector
                                                    probType={probType}
                                                    changeProblemType={
                                                        changeProblemType
                                                    }
                                                />
                                            </div>
                                            {(probType !== 4 ||
                                                answers.length) < 2 && (
                                                <FaPlus
                                                    className="text-base ml-2 cursor-pointer"
                                                    onClick={addAns}
                                                />
                                            )}
                                        </div>
                                        <div className="text-sm">
                                            {answerBlurb}
                                        </div>
                                        {answers.map((a, k) => {
                                            let ansTxt = a.answer_text;
                                            let isRight = a.is_correct;
                                            return (
                                                <div key={k} className="flex">
                                                    <input
                                                        key={k}
                                                        type="text"
                                                        onChange={(e) =>
                                                            chgAnsTxt(e, k)
                                                        }
                                                        onBlur={(e) =>
                                                            handleAnswerBlur(
                                                                e,
                                                                k,
                                                            )
                                                        }
                                                        value={ansTxt}
                                                        className="w-full"
                                                    />
                                                    {(probType === 1 ||
                                                        probType === 2) && (
                                                        <Checkbox
                                                            checked={isRight}
                                                            onChange={(e) =>
                                                                chgAnsCorrect(
                                                                    e,
                                                                    k,
                                                                )
                                                            }
                                                            className="border border-black border-1"
                                                        />
                                                    )}
                                                    <Checkbox
                                                        checked={a.display_type === 'latex'}
                                                        onChange={(e) =>
                                                            chgAnsUseLatex(
                                                                e,
                                                                k,
                                                            )
                                                        }
                                                        className="border border-black border-1"
                                                    />
                                                    <FaTrash
                                                        className="text-base ml-2 cursor-pointer"
                                                        onClick={(e) =>
                                                            delAns(e, k)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                {(probType === 3 || probType === 4) &&
                                    toleranceSelection}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="">
                                <div className="mx-auto max-w-7xl space-y-6 ">
                                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                        <div className="flex items-center text-sm sm:text-md">
                                            {" "}
                                            Pistas:{" "}
                                            <FaPlus
                                                className="text-base ml-2 cursor-pointer"
                                                onClick={addHint}
                                            />
                                        </div>
                                        {hints.map((h, k) => {
                                            let hintTxt = h.hint;
                                            return (
                                                <div
                                                    key={`hnt_${k}`}
                                                    className="flex"
                                                >
                                                    <input
                                                        key={k}
                                                        type="text"
                                                        onChange={(e) =>
                                                            chgHintTxt(e, k)
                                                        }
                                                        value={hintTxt}
                                                        className="w-full"
                                                    />
                                                    <FaTrash
                                                        className="text-base ml-2 cursor-pointer"
                                                        onClick={(e) =>
                                                            delHint(e, k)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="">
                                <div className="mx-auto max-w-7xl ">
                                    <CourseSelect
                                        courses={courses}
                                        selected={courseId}
                                        onSelectCourse={selectCourse}
                                        onSelectChapter={selectChapter}
                                        onSelectLesson={selectLesson}
                                        chapterId={chapterId}
                                        lessonId={lessonId}
                                    />
                                    <div className="text-center bg-white p-1 shadow text-xs sm:rounded-lg sm:p-8">
                                        <CreditsComponent
                                            credits={credits}
                                            selected={creditId}
                                            onChange={updateCredit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div
                        className="text-center bg-white p-1 shadow text-md sm:text-2xl sm:rounded-lg sm:p-8 cursor-pointer"
                        onClick={save}
                    >
                        GUARDAR
                    </div>
                </div>
            </div>
            {problem !== null && (
                <FeedbackComponent
                    show={showFeedback}
                    feedback={feedbackMessage}
                    points={points}
                    next={nextProblem}
                    hint={toggleShowHint}
                    hasNextProblem={problemIds.siguiente !== null}
                    onClose={closeFeedbackModal}
                />
            )}
            {problem !== null && (
                <HintComponent
                    show={showHint}
                    hints={hints}
                    next={nextProblem}
                    onClose={closeHintModal}
                    hintsToShow={hintsToShow}
                    nextHint={nextHint}
                    prevHint={prevHint}
                />
            )}
            <ImageGalleryComponent
                show={showGallery}
                onClose={closeGalleryModal}
                course={course}
                images={images}
                addImageToProb={addImageToProb}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
