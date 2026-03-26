import { useState } from "react";
import Modal from "@/Components/Modal";

export default function FeedbackComponent(props) {
    let bgColor = "bg-orange-300";
    if (props.points >= 90) {
        bgColor = "bg-green-300";
    }
    if (props.points === 0) {
        bgColor = "bg-red-300";
    }
    if (!props.hasNextProblem) {
        fetch(route("lesson.score", { id: props.lessonId }))
            .then((res) => res.json())
            .then((r) => {
                console.log(r);
            });
    }

    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose}>
                <div className={`${bgColor} p-4 shadow sm:rounded-lg`}>
                    <div className="flex justify-between">
                        {props.feedback}
                        <div className="flex justify-col">
                            <div
                                className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                onClick={props.onClose}
                            >
                                cerrar
                            </div>
                            {props.hasHints && (
                                <div
                                    className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                    onClick={props.closeAndShowHints}
                                >
                                    ver los pasos
                                </div>
                            )}
                            {props.hasNextProblem && (
                                <div
                                    className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                    onClick={props.next}
                                >
                                    siguiente
                                </div>
                            )}
                            {!props.hasNextProblem && (
                                <div
                                    className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                    onClick={props.next}
                                >
                                    YAY YOU DID IT
                                </div>
                            )}
                            {props.reset != null &&
                                <div
                                    className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                                    onClick={props.reset}
                                >
                                    resetear
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
