import { useState, useEffect } from 'react';

export default function FillInTheBlanksBox (props) {
    console.log(props)
    return (
        <input 
            className="text-center bg-white p-1 shadow sm:p-4 border-black border-1" 
            value={ props.showText }
            onChange={ (e) => console.log(e) }
            disabled={ false }
        />
    )
}
