import { useState, useEffect } from "react";
import AnswerChoice from "@/Components/AnswerChoice";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { handleFraction, shuffleArray } from "@/Helpers/Utilities";

export default function FillInTheBlanksAnswerComponent(props) {
    const [selectedAnswers, setSelectedAnswers] = useState(
        props.selectedAnswers,
    );
    const [hasAnswered, setHasAnswered] = useState(false);
    const [slot, setSlot] = useState(1);

    function selectAnswer(ans) {
        console.log(ans)
        let a = [...props.selectedAnswers];
        ans.slot_number = slot;
        setSlot(slot + 1);
        a.push(ans);
        setSelectedAnswers(a);
        props.setSelectedAnswers(a);
    }

    return (
        <>
            <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
                <div className="text-center bg-white p-4 shadow text-2xl sm:rounded-lg sm:p-8">
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 text-center pt-2 text-base">
                        Haz clic en una opción para llenar la siguiente caja.
                    </div>
                    <div className="flex justify-center flex-wrap">
                        {shuffleArray(props.answers).map((r, k) => {
                            r.display_type = 'text'
                            let isSelected = false;
                            props.selectedAnswers.some((a) => {
                                if (r.answer_text === a.answer_text) {
                                    isSelected = true;
                                    return true;
                                }
                                return false;
                            });
                            return isSelected ? (
                                ""
                            ) : (
                                <AnswerChoice
                                    key={k}
                                    answer={r}
                                    select={selectAnswer}
                                    selected={isSelected}
                                    selectable={!hasAnswered}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            {!hasAnswered && (
                <div
                    className="mx-auto w-48 text-center my-6 space-y-6 sm:px-6 lg:px-8 cursor-pointer"
                    onClick={() => {
                        props.answerSelect(selectedAnswers);
                        setHasAnswered(true);
                    }}
                >
                    <div className="bg-white p-6 shadow sm:rounded-lg sm:p-4">
                        Enviar
                    </div>
                </div>
            )}
        </>
    );
}
