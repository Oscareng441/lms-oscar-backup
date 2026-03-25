import { useState, useEffect } from "react";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import AnswerComponent from "@/Components/AnswerComponent";
import ProblemPane from "@/Components/ProblemPane";
import Modal from "@/Components/Modal";

export default function DisplaySubProblem(props) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [problem, setProblem] = useState({id: 0, display_type: '', problem_text: '', problem_type_id: 0})
    const [answers, setAnswers] = useState([])
    const [subProblemCount, setSubProblemCount] = useState(1)
    const [showFeedback, setShowFeedback] = useState(null);
    const editMode = "editMode" in props && props.editMode;

    useEffect(() => {
        fetch(route('subproblem.fetch', {id: props.parentId, seq: subProblemCount}))
        .then(res => res.json())
        .then(res => {setProblem(res.problem);setAnswers(res.answers);})
    }, [subProblemCount, props.parentId]);

    useEffect(() => {
        console.log(props)
        setShowFeedback(props.showFeedback)
    }, [props]);

    const next = () => {
        if (subProblemCount < props.subProblemCount) {
            setSubProblemCount(subProblemCount + 1)
        } else {
            props.onClose()
        }
    }

    const prev = () => {
        setSubProblemCount(subProblemCount - 1)
    }

    let hasPrevSubProblem = subProblemCount > 1
    let colr = hasPrevSubProblem ? "" : "text-slate-400";
    let pointer = hasPrevSubProblem ? "cursor-pointer" : "";
    let clik = hasPrevSubProblem ? () => {setSubProblemCount(subProblemCount - 1)} : () => {};
    let prevLink = (
            <IoCaretBack
                className={`${pointer} ${colr} mx-1`}
                onClick={clik}
                title="problema anterior"
            />
        );

    let hasNextSubProblem = subProblemCount < props.subProblemCount
    colr = hasNextSubProblem ? "" : "text-slate-400";
    pointer = hasNextSubProblem ? "cursor-pointer" : "";
    clik = hasNextSubProblem ? () => {setSubProblemCount(subProblemCount + 1)} : () => {};
    let nextLink = (
            <IoCaretForward
                className={`${pointer} ${colr} mx-1`}
                onClick={clik}
                title="próximo problema"
            />
        );

    return (
        <>
            <div className="mx-auto max-w-7xl space-y-1" translate="no">
            <Modal show={props.show} onClose={props.onClose}>
                <div className="mt-10 overflow-y-auto max-h-screen bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex flex-row w-fit">
                        <div className="mr-4 font-bold">
                            {problem.name}
                        </div>
                        <div className="flex flex-row w-fit items-center">
                            {prevLink}
                            {nextLink}
                        </div>
                    </div>
                    <ProblemPane
                        problem={problem}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                    />
                    <AnswerComponent
                        handleAnswer={props.handleAnswer}
                        answers={answers}
                        numberCorrect={props.numberCorrect}
                        answered={false}
                        problemTypeId={problem.problem_type_id}
                        editMode={editMode}
                        setSelectedAnswers={setSelectedAnswers}
                    />
                    <SimpleFeedback
                        show={props.showFeedback}
                        onClose={() => {props.setShowFeedback(false); next();}}
                        feedback={props.feedback}
                        points={props.points}
                    />
                    <div className="mt-4 w-full flex">
                        {subProblemCount > 1 &&
                            <div
                                className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                onClick={() => {setSubProblemCount(subProblemCount - 1)}}
                            >
                              Previous
                            </div>
                        }
                        {subProblemCount < props.subProblemCount &&
                            <div
                                className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                onClick={() => {setSubProblemCount(subProblemCount + 1)}}
                            >
                              Next
                            </div>
                        }
                        <div
                            className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                            onClick={props.onClose}
                        >
                          Close
                        </div>
                  </div>
                </div>
               </Modal> 
            </div>
        </>
    );
}

function SimpleFeedback(props) {
    let bgColor = "bg-orange-300";
    if (props.points >= 90) {
        bgColor = "bg-green-300";
    }
    if (props.points === 0) {
        bgColor = "bg-red-300";
    }

    return (
        <Modal show={props.show} onClose={props.onClose}>
            <div className={`${bgColor} p-4 shadow sm:rounded-lg`}>
                <div className="flex justify-between">
                    {props.feedback}
                    <div className="flex justify-col">
                        <div
                            className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                            onClick={props.onClose}
                        >
                            ok
                        </div>
                    </div>
                </div>
            </div>
        </Modal> 
    )
}
