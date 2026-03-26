import { useState } from "react";
import { PiSteps } from "react-icons/pi";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import AnswerComponent from "@/Components/AnswerComponent";
import ProblemPane from "@/Components/ProblemPane";

export default function DisplayProblem(props) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const editMode = "editMode" in props && props.editMode;

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

    colr = props.hasNextProblem ? "" : "text-slate-400";
    pointer = props.hasNextProblem ? "cursor-pointer" : "";
    clik = props.hasNextProblem ? props.next : () => {};
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

    return (
        <>
            <div className="mx-auto max-w-7xl space-y-1" translate="no">
                <div className="bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex flex-row w-fit">
                        <div className="mr-4 font-bold">
                            {props.problem.name}
                        </div>
                        <div className="flex flex-row w-fit items-center">
                            {hintLink}
                            {prevLink}
                            {nextLink}
                        </div>
                    </div>
                    <ProblemPane
                        problem={props.problem}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                    />
                    <AnswerComponent
                        handleAnswer={props.handleAnswer}
                        answers={props.answers}
                        numberCorrect={props.numberCorrect}
                        answered={props.answered}
                        problemTypeId={props.problem.problem_type_id}
                        editMode={editMode}
                        setSelectedAnswers={setSelectedAnswers}
                        selectedAnswers={selectedAnswers}
                    />
                </div>
            </div>
        </>
    );
}
