import { useState, useEffect } from 'react';

export default function FillInTheBlanksBox (props) {
    return (
        <div 
            className="text-center bg-white p-1 shadow sm:p-4 border border-black border-3 w-1/4 cursor-pointer border-1 rounded-lg" 
            onClick={ () => props.remove(props.showText) }
        >
            { props.showText }
        </div>
    )
}
