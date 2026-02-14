import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ShowProblem from "@/Components/ShowProblem";
import TopMenu from "@/Components/TopMenu";
import FeedbackComponent from "@/Components/FeedbackComponent";
import EndOfSet from "@/Components/EndOfSet";
import HybridDisplay from "@/Components/HybridDisplay";
import FillInTheBlanksDisplay from "@/Components/FillInTheBlanksDisplay";
import IsPremiumComponent from "@/Components/IsPremiumComponent";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Link, Head } from "@inertiajs/react";
import { buildBreadCrumbs } from "@/Helpers/Utilities";
import { LuListRestart } from "react-icons/lu";
import { FaLock } from "react-icons/fa";

const StudentProblemSet = ({
    auth,
    problems,
    lesson,
    chapter,
    course,
    userScores,
}) => {
    const [currentProblem, setCurrentProblem] = useState(null);
    const [currentProblemIdx, setCurrentProblemIdx] = useState(-1);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [points, setPoints] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [hintsToShow, setHintsToShow] = useState(1);
    const [showEndOfSet, setShowEndOfSet] = useState(false);
    const [scores, setScores] = useState(userScores);

    const title = `Ejercicios`;
    const breadcrumbs = buildBreadCrumbs({ lesson, chapter, course }, 4);

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            courseId={course.id}
            lessonId={lesson.id}
            chapterId={lesson.lesson_set_id}
            show={["home", "lesson", "prob-edit", "prob-add", "prob-set-edit"]}
            breadcrumbs={breadcrumbs}
        />
    );

    let userScore, bgCol, txtCol;
    const probList = problems.map((p, k) => {
        userScore = scores[p.id];
        bgCol =
            userScore === null
                ? "bg-white"
                : userScore >= 90
                  ? "bg-green-100"
                  : userScore >= 50
                    ? "bg-yellow-200"
                    : "bg-red-200";
        txtCol = userScore === null ? "text-black" : "text-slate-400";

        if (!p.active) {
            return null;
        }
        let problemSection;
        if (p.display_type === "text") {
            // deprecate
            problemSection = (
                <div
                    key={k}
                    dangerouslySetInnerHTML={{ __html: p.problem_text }}
                />
            );
        }
        if (p.display_type === "html") {
            problemSection = (
                <div
                    key={k}
                    dangerouslySetInnerHTML={{ __html: p.problem_text }}
                />
            );
        }
        if (p.display_type === "latex") {
            problemSection = <Latex key={k}>{p.problem_text}</Latex>;
        }
        if (p.display_type === "pdf") {
            problemSection = (
                <iframe
                    key={k}
                    src={`/storage/${pageAssets.pdf}.pdf`}
                    style={{ width: "900px", height: "1200px" }}
                    frameBorder="0"
                />
            );
        }
        if (p.display_type === "hybrid") {
            problemSection = <HybridDisplay key={k} content={p.problem_text} />;
        }
        if (p.display_type === "ranuras") {
            problemSection = (
                <FillInTheBlanksDisplay content={p.problem_text} />
            );
        }
        return (
            <div key={k} className="text-left">
                <Link
                    as="button"
                    disabled={userScore !== null}
                    href={route("problem.show", p.id)}
                >
                    <div className="flex flex-row justify-space items-center my-8 w-full">
                        <div className="text-sm">
                            {p.name}
                            {p.is_premium && (
                                <IsPremiumComponent hasAccess={p.has_access} />
                            )}
                        </div>
                        <div
                            className={`text-center ${bgCol} ${txtCol} w-full p-1 m-2 shadow text-2xl sm:rounded-lg sm:p-2 border border-slate-200`}
                        >
                            {problemSection}
                        </div>
                    </div>
                </Link>
            </div>
        );
    });

    const confirmAndReset = () => {
        if (confirm("Quieres resetear tus resultados de esta lección?")) {
            fetch(route("results.reset", { lessonId: lesson.id }))
                .then((res) => res.json())
                .then(
                    (results) => {
                        setScores(results);
                    },
                    (error) => {
                        console.log("error", error);
                    },
                );
        }
    };

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
                    <div className="italic text-sm sm:text-md flex justify-between ">
                        Haz clic en un problema para contestarlo:
                        {(auth.is_admin || auth.is_teacher) && (
                            <p className="not-italic text-sm sm:text-md text-green-600">
                                <Link
                                    href={route("problemset.edit", lesson.id)}
                                >
                                    Go to edit mode
                                </Link>
                            </p>
                        )}
                        <div
                            className="float-right"
                            title="reiniciar problemas"
                        >
                            <div
                                onClick={confirmAndReset}
                                className="text-slate-600"
                            >
                                <LuListRestart />
                            </div>
                        </div>
                    </div>
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        {probList}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default StudentProblemSet;
