import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import HybridDisplay from "@/Components/HybridDisplay";
import FeedbackComponent from "@/Components/FeedbackComponent";
import HintComponent from "@/Components/HintComponent";
import DisplayProblem from "@/Components/DisplayProblem";
import DisplaySubProblem from "@/Components/DisplaySubProblem";
import LessonNav from "@/Components/LessonNav";
import ProblemNav from "@/Components/ProblemNav";
import TopMenu from "@/Components/TopMenu";
import BottomMenu from "@/Components/BottomMenu";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { buildBreadCrumbs } from "@/Helpers/Utilities";

const Show = ({
    auth,
    prob,
    answers,
    hints,
    subProblems,
    lesson,
    course,
    chapter,
    problemIds,
    lessonIds,
    numberCorrect,
    score,
}) => {
    const [htmlContent, setHtmlContent] = useState(prob.problem_text);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [points, setPoints] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showSubProblem, setShowSubProblem] = useState(false);
    const [showFeedbackSubProblem, setShowFeedbackSubProblem] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("right");
    const [showHint, setShowHint] = useState(false);
    const [hintsToShow, setHintsToShow] = useState(1);
    const [subProblemNumber, setSubProblemNumber] = useState(1);

    const handleKeyDown = (event) => {
        switch (event.key) {
            // case 'n':
            case "ArrowRight":
                nextProblem();
                break;
            case "ArrowLeft":
                // case 'p':
                prevProblem();
                break;
            default:
            // nothing
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const title = `${lesson.short_name}`;

    const handleAnswer = (id, points, msg) => {
        setFeedbackMessage(msg);
        setShowFeedback(true);
        setPoints(points);
    };

    const handleAnswerSubProblem = (id, points, msg) => {
        setFeedbackMessage(msg);
        setShowFeedbackSubProblem(true);
        setPoints(points);
    };

    const toggleShowHint = () => {
        setShowFeedback(false);
        if (subProblems.length === 0) {
            setShowHint(!showHint);
        } else {
            setShowSubProblem(!showSubProblem);
        }
    };

    const toggleShowSubProblem = () => {
        setShowSubProblem(!showSubProblem);
    };

    const closeShowSubProblem = () => {
        setShowSubProblem(false);
    };

    const nextHint = () => {
        setHintsToShow(hintsToShow + 1);
    };

    const prevHint = () => {
        setHintsToShow(hintsToShow - 1);
    };

    const nextProblem = () => {
        window.location.href = "/problem/" + problemIds.siguiente;
    };

    const prevProblem = () => {
        window.location.href = "/problem/" + problemIds.anterior;
    };

    const closeFeedbackModal = () => {
        setShowFeedback(false);
    };

    const closeHintModal = () => {
        setShowHint(false);
    };

    const closeFeedbackAndShowHints = () => {
        setShowFeedback(false);
        setShowHint(true);
    };

    const reset = () => {
        if (confirm("Quieres resetear tus resultados de esta lección y reiniciar?")) {
            fetch(route("results.reset", { lessonId: lesson.id }))
                .then((res) => res.json())
                .then(
                    (results) => {
                        window.location.href = route('problemset.start', { id: lesson.id });
                    },
                    (error) => {
                        console.log("error");
                    },
                );
        }
    };

    const breadcrumbs = buildBreadCrumbs({ course, chapter, lesson }, 4);
    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            lessonId={lesson.id}
            problemId={prob.id}
            show={["home", "prob-set", "prob-add", "prob-dup", "prob-edit"]}
            breadcrumbs={breadcrumbs}
        />
    );
    let bottomMenu = (
        <BottomMenu
            prev={problemIds.anterior}
            next={problemIds.siguiente}
            probs={null}
            nextWhat='problem.show'
            middleLink={{
                url: 'problemset.student',
                id: lesson.id,
                text: 'lista de problemas',
            }}
        />
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
            bottomMenu={bottomMenu}
        >
            <Head title={title} />
            <div className="py-2" translate="no">
                <DisplayProblem
                    problem={prob}
                    answers={answers}
                    handleAnswer={handleAnswer}
                    showHint={showHint}
                    hint={toggleShowHint}
                    hintsToShow={hintsToShow}
                    nextHint={nextHint}
                    totalHints={!hints && !subProblems ? 0 : Math.max(hints.length, subProblems.length)}
                    next={nextProblem}
                    prev={prevProblem}
                    numberCorrect={numberCorrect}
                    answered={score !== null}
                    hasNextProblem={problemIds.siguiente !== null}
                    hasPrevProblem={problemIds.anterior !== null}
                />
            </div>
            <div className="py-2" translate="no">
                <DisplaySubProblem
                    show={showSubProblem}
                    parentId={prob.id}
                    onClose={closeShowSubProblem}
                    handleAnswer={handleAnswerSubProblem}
                    subProblemNumber={subProblemNumber}
                    subProblemCount={!subProblems ? 0 : subProblems.length}
                    numberCorrect={numberCorrect}
                    answered={false}
                    showFeedback={showFeedbackSubProblem}
                    setShowFeedback={setShowFeedbackSubProblem}
                    feedback={feedbackMessage}
                    points={points}
                />
            </div>
            <FeedbackComponent
                show={showFeedback}
                feedback={feedbackMessage}
                points={points}
                next={nextProblem}
                hint={toggleShowHint}
                lessonId={lesson.id}
                reset={reset}
                hasHints={hints != null && hints.length > 0}
                hasNextProblem={problemIds.siguiente !== null}
                onClose={closeFeedbackModal}
                closeAndShowHints={closeFeedbackAndShowHints}
            />
            <HintComponent
                show={showHint}
                hints={hints}
                next={nextProblem}
                onClose={closeHintModal}
                hintsToShow={hintsToShow}
                nextHint={nextHint}
                prevHint={prevHint}
            />
        </AuthenticatedLayout>
    );
};

export default Show;
