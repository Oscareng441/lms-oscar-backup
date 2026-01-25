import { useState, useEffect, Fragment } from 'react';
import FillInTheBlanksBox from '@/Components/FillInTheBlanksBox';

export default function FillInTheBlanksDisplay(props) {
    const [theDisplay, setTheDisplay] = useState('')

    useEffect(() => {
        setTheDisplay('chosenAnswers' in props ? parseBlanks(props.content) : displayOnly(props.content))
    }, [props.content, props.chosenAnswers])

    useEffect(() => console.log(props), [props])

    function removeAnswer(ansrTxt) {
        let a = [ ...props.chosenAnswers ]
        let idx = -1
        a.some((x, k) => {
            if (x.answer_text === ansrTxt) {
                idx = k
                return true
            }

            return false
        })
        a.splice(idx, 1)
        props.setSelectedAnswers(a)
    }

    function displayOnly(txt) {
        let arr = txt.split('_')
        let ret1 = []
        arr.forEach((r,k) => {
            if (k % 2) {
                let textToShow = ''
                ret1.push(<FillInTheBlanksBox answer={ r } showText={ textToShow } remove={ removeAnswer } />)
            } else {
                ret1.push(<div className="bg-white px-2">{ r }</div>)
            }
        })
        let ret = ret1.map((r,k) => {
            return (
                <Fragment key={ k }>
                    { r }
                </Fragment>
            )
        })

        return ret
    }

    function parseBlanks(txt) {
        let arr = txt.split('_')
        console.log(arr)
        let ret1 = []
        arr.forEach((r,k) => {
            if (k % 2) {
                let textToShow = props.chosenAnswers.length > (k-1)/2 ? props.chosenAnswers[(k-1)/2]['answer_text'] : ''
                ret1.push(<FillInTheBlanksBox answer={ r } showText={ textToShow } remove={ removeAnswer } />)
            } else {
                ret1.push(<div className="bg-white px-2">{ r }</div>)
            }
        })
        let ret = ret1.map((r,k) => {
            return (
                <Fragment key={ k }>
                    { r }
                </Fragment>
            )
        })

        return ret
    }

    return (
        <div className="flex justify-start items-center">
            { theDisplay }
        </div>
    )
}