import { useState, useEffect } from 'react';
import { PiSteps } from "react-icons/pi";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { MdSkipPrevious } from "react-icons/md";
import { BsFillSkipStartFill } from "react-icons/bs";
import AnswersComponent from '@/Components/AnswersComponent';
import MultiAnswersComponent from '@/Components/MultiAnswersComponent';
import OpenAnswerComponent from '@/Components/OpenAnswerComponent';
import OpenAlphaAnswerComponent from '@/Components/OpenAlphaAnswerComponent';
import HybridDisplay from '@/Components/HybridDisplay';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import levenshtein from 'js-levenshtein';

export default function ShowProblem(props) {
    const [htmlContent, setHtmlContent] = useState(props.problem.problem_text)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [points, setPoints] = useState(null)
    const [feedbackMessage, setFeedbackMessage] = useState('right')
    const editMode = 'editMode' in props && props.editMode

    const multiAnswerSelect = (ans) => {
        let numCorr = props.numberCorrect
        let score = 0, total = 0
        props.answers.forEach(r => {
            let didSubmit = ans.indexOf(r.id) >= 0
            if (r.is_correct) {
                total++;
                if (didSubmit) {
                    score++;
                }
            }
        })
        let pts = !total ? 1 : Math.floor(0.5 + 100 * (100 * score/total)) / 100
        setPoints(pts)
        let msg = (score + ' correctos de ' + total + ' para ' + pts + '%')
        if (!editMode) {
            fetch(route('results.recordanswer', { id: props.problem.id, answers: ans, score: pts }))
        }
        props.handleAnswer(props.problem.id, pts, msg)
    }

    useEffect(() => {
        console.log('props', props)
    }, [props.ctr])

    const answerSelect = (ans) => {
        let pts, msg
        if (ans.is_correct) {
            pts = 100
            msg = getPositiveFeedback()
        } else {
            pts = 0
            msg = getNegativeFeedback()
        }
        setPoints(pts)
        if (!editMode) {
            fetch(route('results.recordanswer', { id: props.problem.id, answers: [ans.id], score: pts} ))
        }
        props.handleAnswer(props.problem.id, pts, msg)
    }

    const getPositiveFeedback = () => {
        const choices = [
            'Así es!',
            'Bien!',
            'Correcto!',
            'Excelente!',
        ];
        return choices[Math.floor(choices.length * Math.random())]
    }

    const getNegativeFeedback = () => {
        const choices = [
            'Casi...',
            'Hmm, no...',
            'No creo...',
            'No estoy de acuerdo...!',
        ];
        return choices[Math.floor(choices.length * Math.random())]
    }

    const openAnswerSubmit = (ans) => {
        let pts, msg
        let houseAnswer = parseFloat(props.answers[0].answer_text);
        let tolerance = parseFloat(props.answers[0].pct_tolerance);
        let ansMin = (1 - tolerance) * houseAnswer;
        let ansMax = (1 + tolerance) * houseAnswer;
        if (ansMax < ansMin) {
            let tmp = ansMax
            ansMax = ansMin
            ansMin  = tmp
        }
        if (ans >= ansMin && ans <= ansMax) {
            pts = 100
            msg = getPositiveFeedback()
        } else {
            pts = 0
            msg = getNegativeFeedback()
        }
        setPoints(pts)
        if (!editMode) {
            fetch(route('results.recordanswer', { id: props.problem.id, answers: ans, score: pts} ))
        }
        props.handleAnswer(props.problem.id, pts, msg)
    }

    const openAlphaAnswerSubmit = (ans) => {
        let pts, msg, corr, regx, dist
        props.answers.forEach(a => {
            dist = levenshtein(a.answer_text, ans)
            if (dist/a.answer_text.length < a.pct_tolerance) {
                corr = true
            }
            regx = new RegExp(a.answer_text, "i")
            if(regx.test(ans.toLowerCase())) {
                corr = true
            }
        })
        if (corr) {
            pts = 100
            msg = getPositiveFeedback()
        } else {
            pts = 0
            msg = getNegativeFeedback()
        }
        setPoints(pts)
        if (!editMode) {
            fetch(route('results.recordanswer', { id: props.problem.id, answers: ans, score: pts} ))
        }
        props.handleAnswer(props.problem.id, pts, msg)
    }

    let problemSection, answerComponent, answersType = 'latex'

    let disabled = props.totalHints <= 0
    let colr = disabled ? 'text-slate-400' : ''
    let pointer = disabled ? '' : 'cursor-pointer'
    let clik = disabled ? () => {} : props.hint
    let hintLink = <PiSteps className={`${pointer} ${colr} mx-1`} onClick={clik} title="enséñame los pasos" />

    colr = props.hasNextProblem ? '' : 'text-slate-400'
    pointer = props.hasNextProblem ? 'cursor-pointer' : ''
    clik = props.hasNextProblem ? props.next : () => {}
    let nextLink = props.hints === null ? '' : <IoCaretForward className={`${pointer} ${colr} mx-1`} onClick={clik} title="próximo problema" />

    colr = props.hasPrevProblem ? '' : 'text-slate-400'
    pointer = props.hasPrevProblem ? 'cursor-pointer' : ''
    clik = props.hasPrevProblem ? props.prev : () => {}
    let prevLink = props.hints === null ? '' : <IoCaretBack className={`${pointer} ${colr} mx-1`} onClick={clik} title="problema anterior" />

    colr = props.problem != null ? '' : 'text-slate-400'
    pointer = props.problem != null ? 'cursor-pointer' : ''
    clik = props.problem != null ? props.restart : () => {}
    let restartLink = props.hints === null ? '' : <BsFillSkipStartFill className={`${pointer} ${colr} mx-1`} onClick={clik} title="reiniciar" />

    if (props.problem.display_type === 'text') { // deprecate
        problemSection = (
            <div dangerouslySetInnerHTML={{ __html: props.problem.problem_text }} />
        )
    }
    if (props.problem.display_type === 'html') {
        problemSection = (
            <div dangerouslySetInnerHTML={{ __html: props.problem.problem_text }} />
        )
    }
    if (props.problem.display_type === 'latex') {
        problemSection = (
            <Latex>{ props.problem.problem_text }</Latex>
        )
    }
    if (props.problem.display_type === 'pdf') {
        problemSection = (
            <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
        )
    }
    if (props.problem.display_type === 'hybrid') {
        problemSection = (
            <HybridDisplay content={ props.problem.problem_text } />
        )
    }

    if (props.problem.problem_type_id === 1) {
        answerComponent = (
            <AnswersComponent answers={ props.answers } answered={ props.answered } answerSelect={ answerSelect } editMode={ editMode }  />
        )
    }
    if (props.problem.problem_type_id === 2) {
        answerComponent = (
            <MultiAnswersComponent answers={ props.answers } answered={ props.answered } answerSelect={ multiAnswerSelect } numCorrect={props.numberCorrect} editMode={ editMode } />
        )
    }
    if (props.problem.problem_type_id === 4) {
        answerComponent = (
            <OpenAnswerComponent answers={ props.answers } answered={ props.answered } answerSelect={ openAnswerSubmit } editMode={ editMode } />
        )
    }
    if (props.problem.problem_type_id === 3) {
        answerComponent = (
            <OpenAlphaAnswerComponent answers={ props.answers } answered={ props.answered } answerSelect={ openAlphaAnswerSubmit } editMode={ editMode } />
        )
    }
    if (props.answered && !props.editMode) {
        answerComponent = (
            <div className="mx-auto w-full text-center bg-slate-500/50">Ya contestaste este problema</div>
        )
    }

    return (
        <>
            <div className="mx-auto max-w-7xl space-y-1">
                <div className="bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex flex-row w-fit">
                        { hintLink }
                        { nextLink }
                        { prevLink }
                        { restartLink } 
                    </div>
                    <div className="py-2">
                        <div className="mx-auto space-y-6">
                            <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                                { problemSection }
                            </div>
                        </div>
                    </div>
                    { answerComponent }
                </div>
            </div>
        </>
    );
}
