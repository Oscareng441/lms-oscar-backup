import { useState, useEffect } from "react";

export default function FillInTheBlanksBox(props) {
    return (
        <div
            className={`text-center bg-white p-1 shadow p-1 sm:p-2 border ${props.next ? 'border-black' : '3'} border-${props.next ? 4 : 2} min-w-[45px] max-w-1/4 cursor-pointer border-1 rounded-sm`}
            onClick={() => props.remove(props.showText)}
        >
            {props.showText}
        </div>
    );
}
