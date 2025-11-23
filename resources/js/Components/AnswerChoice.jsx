import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function AnswerChoice (props) {
    console.log(props)
    let ans = props.answer.answer_text
    let useLatex = false
    if (!isNaN(ans)) {
        useLatex = true
        ans = '$' + ans + '$'
    }                
    let border = props.selected ? 'border-2 border-slate-400' : ''
    let cursor = props.selectable ? 'cursor-pointer' : ''
    return (
        <div className={`py-2 ${ cursor }`} onClick={ () => props.select(props.answer) } >
            <div className="max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className={`bg-white ${ border } m-2 p-6 shadow-xl sm:rounded-lg sm:p-4`}>
                    {
                        useLatex &&
                        <Latex>{ ans }</Latex>
                    }
                    {
                        !useLatex &&
                        <span>{ ans }</span>
                    }
                </div>
            </div>
        </div>
    )
}
