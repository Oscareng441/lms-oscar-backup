import { useState, useEffect } from 'react';

export default function FillInTheBlanksBox (props) {
    return (
        <input 
            className="text-center bg-white p-1 shadow sm:p-4 border-black border-1 cursor-pointer" 
            value={ props.showText }
            onClick={ props.remove }
            disabled={ false }
        />
    )
}
