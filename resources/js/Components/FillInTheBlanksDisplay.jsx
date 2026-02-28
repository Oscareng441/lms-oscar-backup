import { useState, useEffect, Fragment } from "react";
import FillInTheBlanksBox from "@/Components/FillInTheBlanksBox";

export default function FillInTheBlanksDisplay(props) {
    const [theDisplay, setTheDisplay] = useState("");
    const [answerCounter, setAnswerCounter] = useState(0);
    const [blanksCounter, setBlanksCounter] = useState(0);

    useEffect(() => {
        setTheDisplay(
            "chosenAnswers" in props
                ? displayProb(props.content)
                : breakdown(props.content, true),
        );
    }, [props.content, props.chosenAnswers]);

    function displayProb(txt) {
        let lines = txt.split("<br/>");
        let B = 0;
        let A = 0;
        return lines.map((txt, kk) => {
            let ret1 = [];
            let arr = txt.split("_");
            arr.forEach((r, k) => {
                if (k % 2) {
                    let textToShow = "";
                    if (props.chosenAnswers.length > B) {
                        textToShow = props.chosenAnswers[A++]["answer_text"];
                    }
                    B++;
                    ret1.push(
                        <FillInTheBlanksBox
                            answer={r}
                            showText={textToShow}
                            remove={removeAnswer}
                        />,
                    );
                } else {
                    ret1.push(
                        <div
                            className="bg-white px-2"
                            dangerouslySetInnerHTML={{ __html: r }}
                        />,
                    );
                }
            });
            return (
                <div
                    className="flex justify-start items-center my-4 flex-wrap"
                    key={`d-${kk}`}
                >
                    {ret1.map((r, k) => {
                        return <Fragment key={`r-${k}`}>{r}</Fragment>;
                    })}
                </div>
            );
        });
    }

    function breakdown(txt) {
        let arr = txt.split("<br/>");
        setBlanksCounter(0);
        setAnswerCounter(0);
        return arr.map((r, k) => {
            let s = forDisplay(r);
            return (
                <div
                    className="flex justify-start items-center my-4"
                    key={`d-${k}`}
                >
                    {s}
                </div>
            );
        });
    }

    function forDisplay(txt) {
        let arr = txt.split("_");
        let ret1 = [];
        arr.forEach((r, k) => {
            if (k % 2) {
                let textToShow = "";
                ret1.push(
                    <FillInTheBlanksBox
                        answer={r}
                        showText={textToShow}
                        remove={removeAnswer}
                    />,
                );
            } else {
                ret1.push(
                    <div
                        className="bg-white px-2"
                        dangerouslySetInnerHTML={{ __html: r }}
                    />,
                );
            }
        });
        let ret = ret1.map((r, k) => {
            return <Fragment key={k}>{r}</Fragment>;
        });

        return ret;
    }

    function removeAnswer(ansrTxt) {
        let a = [...props.chosenAnswers];
        let idx = -1;
        a.some((x, k) => {
            if (x.answer_text === ansrTxt) {
                idx = k;
                return true;
            }

            return false;
        });
        a.splice(idx, 10);
        props.setSelectedAnswers(a);
    }

    return <div className="">{theDisplay}</div>;
}
