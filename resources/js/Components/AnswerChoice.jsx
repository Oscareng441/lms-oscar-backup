import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function AnswerChoice(props) {
    let ans = props.answer.answer_text;
    // if display_type is latex or the distractor is just a number, use latex
    let useLatex = props.answer.display_type === 'latex' || !isNaN(ans);
    if (useLatex) {
        if (!(ans.substring(0, 2) === "\\[" || ans.substring(0, 1) === "$")) {
            ans = "$" + ans + "$";
        }
    }
    let border = props.selected ? "border-2 border-slate-400" : "";
    let cursor = props.selectable ? "cursor-pointer" : "";
    return (
        <div
            className={`py-2 ${cursor}`}
            onClick={() => props.select(props.answer)}
        >
            <div className="max-w-7xl space-y-6 text-indigo-600 text-xs sm:text-lg sm:px-6 lg:px-8">
                <div
                    className={`bg-white ${border} m-2 p-6 shadow-xl sm:rounded-lg sm:p-4`}
                >
                    {useLatex && <Latex>{ans}</Latex>}
                    {!useLatex && <div className="">{ans}</div>}
                </div>
            </div>
        </div>
    );
}
