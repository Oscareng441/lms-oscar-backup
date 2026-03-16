import { useState, useEffect } from "react";
import { PiSteps } from "react-icons/pi";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { MdSkipPrevious } from "react-icons/md";
import { BsFillSkipStartFill } from "react-icons/bs";
import AnswersComponent from "@/Components/AnswersComponent";
import MultiAnswersComponent from "@/Components/MultiAnswersComponent";
import OpenAnswerComponent from "@/Components/OpenAnswerComponent";
import OpenAlphaAnswerComponent from "@/Components/OpenAlphaAnswerComponent";
import FillInTheBlanksAnswerComponent from "@/Components/FillInTheBlanksAnswerComponent";
import HybridDisplay from "@/Components/HybridDisplay";
import FillInTheBlanksDisplay from "@/Components/FillInTheBlanksDisplay";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import levenshtein from "js-levenshtein";
import Modal from "@/Components/Modal";

export default function DisplaySubProblem(props) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [problem, setProblem] = useState({id: 0, display_type: '', problem_text: '', problem_type_id: 0})
    const [answers, setAnswers] = useState([])
    const [subProblemCount, setSubProblemCount] = useState(1)
    const [hasAnswered, setHasAnswered] = useState(false);
    const [points, setPoints] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("right");
    const editMode = "editMode" in props && props.editMode;

    useEffect(() => {
        console.log(subProblemCount)
        fetch(route('subproblem.fetch', {id: 1602, seq: subProblemCount}))
        .then(res => res.json())
        .then(res => {setProblem(res.problem);setAnswers(res.answers);})
    }, [props, subProblemCount])

    const fillInTheBlankAnswerSelect = (ans) => {
        let score = 0,
            total = 0;
        let answerTextArr = ans.map((a) => {
            return a.answer_text;
        });
        let submitted = {};
        let correct = {};
        ans.forEach((a) => {
            submitted[a.slot_number] = a.answer_text;
        });
        answers.forEach((r) => {
            if (r.is_correct) {
                correct[r.slot] = r.answer_text;
            }
        });
        for (let i in correct) {
            total++;
            if (i in submitted && submitted[i] === correct[i]) {
                score++;
            }
        }
        let pts = !total
            ? 1
            : Math.floor(0.5 + 100 * ((100 * score) / total)) / 100;
        setPoints(pts);
        let msg = score + " correctos de " + total + " para " + pts + "%";
        if (!editMode) {
            fetch(
                route("results.recordanswer", {
                    id: problem.id,
                    answers: ans,
                    score: pts,
                }),
            );
        }
        props.handleAnswer(problem.id, pts, msg);
    };

    const multiAnswerSelect = (ans) => {
        let score = 0,
            total = 0;
        answers.forEach((r) => {
            let didSubmit = ans.indexOf(r.id) >= 0;
            if (r.is_correct) {
                total++;
                if (didSubmit) {
                    score++;
                }
            }
        });
        let pts = !total
            ? 1
            : Math.floor(0.5 + 100 * ((100 * score) / total)) / 100;
        setPoints(pts);
        let msg = score + " correctos de " + total + " para " + pts + "%";
        if (!editMode) {
            fetch(
                route("results.recordanswer", {
                    id: problem.id,
                    answers: ans,
                    score: pts,
                }),
            );
        }
        props.handleAnswer(problem.id, pts, msg);
    };

    const answerSelect = (ans) => {
        let pts, msg;
        if (ans.is_correct) {
            pts = 100;
            msg = getPositiveFeedback();
        } else {
            pts = 0;
            msg = getNegativeFeedback();
        }
        setPoints(pts);
        if (!editMode) {
            fetch(
                route("results.recordanswer", {
                    id: problem.id,
                    answers: [ans.id],
                    score: pts,
                }),
            );
        }
        props.handleAnswer(problem.id, pts, msg);
    };

    const getPositiveFeedback = () => {
        const choices = ["Así es!", "Bien!", "Correcto!", "Excelente!"];
        return choices[Math.floor(choices.length * Math.random())];
    };

    const getNegativeFeedback = () => {
        const choices = [
            "Casi...",
            "Hmm, no...",
            "No creo...",
            "No estoy de acuerdo...!",
        ];
        return choices[Math.floor(choices.length * Math.random())];
    };

    const openAnswerSubmit = (ans) => {
        let pts, msg;
        let houseAnswer = parseFloat(answers[0].answer_text);
        let tolerance = parseFloat(answers[0].pct_tolerance);
        let ansMin = (1 - tolerance) * houseAnswer;
        let ansMax = (1 + tolerance) * houseAnswer;
        if (ansMax < ansMin) {
            let tmp = ansMax;
            ansMax = ansMin;
            ansMin = tmp;
        }
        if (ans >= ansMin && ans <= ansMax) {
            pts = 100;
            msg = getPositiveFeedback();
        } else {
            pts = 0;
            msg = getNegativeFeedback();
        }
        setPoints(pts);
        if (!editMode) {
            fetch(
                route("results.recordanswer", {
                    id: problem.id,
                    answers: ans,
                    score: pts,
                }),
            );
        }
        props.handleAnswer(problem.id, pts, msg);
    };

    const openAlphaAnswerSubmit = (ans) => {
        let pts, msg, corr, regx, dist;
        answers.forEach((a) => {
            dist = levenshtein(a.answer_text, ans);
            if (dist / a.answer_text.length < a.pct_tolerance) {
                corr = true;
            }
            regx = new RegExp(a.answer_text, "i");
            if (regx.test(ans.toLowerCase())) {
                corr = true;
            }
        });
        if (corr) {
            pts = 100;
            msg = getPositiveFeedback();
        } else {
            pts = 0;
            msg = getNegativeFeedback();
        }
        setPoints(pts);
        if (!editMode) {
            fetch(
                route("results.recordanswer", {
                    id: problem.id,
                    answers: ans,
                    score: pts,
                }),
            );
        }
        props.handleAnswer(problem.id, pts, msg);
    };

    let problemSection,
        answerComponent,
        answersType = "latex";

    let disabled = props.totalHints <= 0;
    let colr = disabled ? "text-slate-400" : "";
    let pointer = disabled ? "" : "cursor-pointer";
    let clik = disabled ? () => {} : props.hint;
    let hintLink = (
        <PiSteps
            className={`${pointer} ${colr} mx-1`}
            onClick={clik}
            title="enséñame los pasos"
        />
    );

    colr = props.hasPrevProblem ? "" : "text-slate-400";
    pointer = props.hasPrevProblem ? "cursor-pointer" : "";
    clik = props.hasPrevProblem ? props.prev : () => {};
    let prevLink =
        props.hints === null ? (
            ""
        ) : (
            <IoCaretBack
                className={`${pointer} ${colr} mx-1`}
                onClick={clik}
                title="problema anterior"
            />
        );

    colr = true ? "" : "text-slate-400";
    pointer = true ? "cursor-pointer" : "";
    clik = true ? () => {setSubProblemCount(1+subProblemCount)} : () => {};
    let nextLink =
        props.hints === null ? (
            ""
        ) : (
            <IoCaretForward
                className={`${pointer} ${colr} mx-1`}
                onClick={clik}
                title="próximo problema"
            />
        );

    if (problem.display_type === "text") {
        // deprecate; use html
        problemSection = (
            <div
                dangerouslySetInnerHTML={{ __html: problem.problem_text }}
            />
        );
    }
    if (problem.display_type === "html") {
        problemSection = (
            <div
                dangerouslySetInnerHTML={{ __html: problem.problem_text }}
            />
        );
    }
    if (problem.display_type === "latex") {
        problemSection = <Latex>{problem.problem_text}</Latex>;
    }
    if (problem.display_type === "pdf") {
        problemSection = (
            <iframe
                src={`/storage/${pageAssets.pdf}.pdf`}
                style={{ width: "900px", height: "1200px" }}
                frameBorder="0"
            />
        );
    }
    if (problem.display_type === "hybrid") {
        problemSection = <HybridDisplay content={problem.problem_text} />;
    }
    if (problem.display_type === "ranuras") {
        problemSection = (
            <FillInTheBlanksDisplay
                content={problem.problem_text}
                chosenAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
            />
        );
    }

    if (problem.problem_type_id === 1) {
        answerComponent = (
            <AnswersComponent
                answers={answers}
                answered={props.answered}
                answerSelect={answerSelect}
                editMode={editMode}
            />
        );
    }
    if (problem.problem_type_id === 2) {
        answerComponent = (
            <MultiAnswersComponent
                answers={answers}
                answered={props.answered}
                answerSelect={multiAnswerSelect}
                numCorrect={props.numberCorrect}
                editMode={editMode}
            />
        );
    }
    if (problem.problem_type_id === 4) {
        answerComponent = (
            <OpenAnswerComponent
                answers={answers}
                answered={props.answered}
                answerSelect={openAnswerSubmit}
                editMode={editMode}
            />
        );
    }
    if (problem.problem_type_id === 3) {
        answerComponent = (
            <OpenAlphaAnswerComponent
                answers={answers}
                answered={props.answered}
                answerSelect={openAlphaAnswerSubmit}
                editMode={editMode}
            />
        );
    }
    if (problem.problem_type_id === 5) {
        answerComponent = (
            <FillInTheBlanksAnswerComponent
                answers={[...answers]}
                answered={props.answered}
                answerSelect={fillInTheBlankAnswerSelect}
                setSelectedAnswers={setSelectedAnswers}
                selectedAnswers={selectedAnswers}
                editMode={editMode}
            />
        );
    }
    if (props.answered && !props.editMode) {
        answerComponent = (
            <div className="mx-auto w-full text-center bg-slate-500/50">
                Ya contestaste este problema
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto max-w-7xl space-y-1" translate="no">
            <Modal show={props.show} onClose={props.onClose}>
                <div className="mt-60 bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex flex-row w-fit">
                        <div className="mr-4 font-bold">
                            {problem.name}
                        </div>
                        <div className="flex flex-row w-fit items-center">
                            {prevLink}
                            {nextLink}
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="mx-auto space-y-6">
                            <div className="text-center bg-white p-1 shadow text-xs sm:text-base rounded-lg sm:p-8">
                                {problemSection}
                            </div>
                        </div>
                    </div>
                    {answerComponent}
                </div>
               </Modal> 
            </div>
        </>
    );
}
