import { useState, useEffect } from "react";
import { PiSteps } from "react-icons/pi";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { MdSkipPrevious } from "react-icons/md";
import SingleMCAnswerComponent from "@/Components/SingleMCAnswerComponent";
import ProblemPane from "@/Components/ProblemPane";
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
import { getNegativeFeedback, getPositiveFeedback } from "@/Helpers/Utilities";

export default function AnswerComponent(props) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [problem, setProblem] = useState({id: 0, display_type: '', problem_text: '', problem_type_id: 0})
    const [subProblemCount, setSubProblemCount] = useState(1)
    const [hasAnswered, setHasAnswered] = useState(false);
    const [points, setPoints] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("right");
    const editMode = "editMode" in props && props.editMode;
console.log(props)
    useEffect(() => {
        setHasAnswered(props.answered)
    }, [props]);

    const fillInTheBlankAnswerSelect = (ans) => {
        console.log(ans)
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
        props.answers.forEach((r) => {
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
        console.log(ans)
        let score = 0,
            total = 0;
        props.answers.forEach((r) => {
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

    const openAnswerSubmit = (ans) => {
        let pts, msg;
        let houseAnswer = parseFloat(props.answers[0].answer_text);
        let tolerance = parseFloat(props.answers[0].pct_tolerance);
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
        props.answers.forEach((a) => {
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

    let answerComponent,
        answersType = "latex";

    if (props.problemTypeId === 1) {
        answerComponent = (
            <SingleMCAnswerComponent
                answers={props.answers}
                answered={props.answered}
                answerSelect={answerSelect}
                editMode={editMode}
            />
        );
    }
    if (props.problemTypeId === 2) {
        answerComponent = (
            <MultiAnswersComponent
                answers={props.answers}
                answered={props.answered}
                answerSelect={multiAnswerSelect}
                numCorrect={props.numberCorrect || props.answers.filter(a => a.is_correct == 1).length}
                editMode={editMode}
            />
        );
    }
    if (props.problemTypeId === 4) {
        answerComponent = (
            <OpenAnswerComponent
                answers={props.answers}
                answered={props.answered}
                answerSelect={openAnswerSubmit}
                editMode={editMode}
            />
        );
    }
    if (props.problemTypeId === 3) {
        answerComponent = (
            <OpenAlphaAnswerComponent
                answers={props.answers}
                answered={props.answered}
                answerSelect={openAlphaAnswerSubmit}
                editMode={editMode}
            />
        );
    }
    if (props.problemTypeId === 5) {
        answerComponent = (
            <FillInTheBlanksAnswerComponent
                answers={[...props.answers]}
                answered={props.answered}
                answerSelect={fillInTheBlankAnswerSelect}
                setSelectedAnswers={props.setSelectedAnswers}
                selectedAnswers={props.selectedAnswers}
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
            {answerComponent}
        </>
    );
}
