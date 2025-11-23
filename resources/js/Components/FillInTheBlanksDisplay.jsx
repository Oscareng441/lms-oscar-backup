import { useState, useEffect, Fragment } from 'react';
import FillInTheBlanksBox from '@/Components/FillInTheBlanksBox';

export default function FillInTheBlanksDisplay(props) {
    const [theDisplay, setTheDisplay] = useState('')

    useEffect(() => {
        setTheDisplay(parseBlanks(props.content))
    }, [props.content, props.chosenAnswers])

    function removeAnswer(e) {
        console.log(1)
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
        <div className="flex justify-start">
            { theDisplay }
        </div>
    )
}

/*
    would like the choices above; click on one puts it in the next available box
*/