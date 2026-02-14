import { useEffect } from "react";

export default function AnswerTypeSelector(props) {
    return ["single MC", "multiple MC", "text", "numeric", "ranuras"].map(
        (t, k) => {
            let key = k + 1;
            console.log(props);
            let sel = key === props.probType ? "font-bold" : "text-slate-500";
            return (
                <div
                    key={t}
                    className={`cursor-pointer text-xs sm:text-sm mx-1 ${sel}`}
                    onClick={() => props.changeProblemType(key)}
                >
                    {t}
                </div>
            );
        },
    );
}
