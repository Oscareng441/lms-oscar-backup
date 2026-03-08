import { useState, useRef } from "react";
import Modal from "@/Components/Modal";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function HintComponent(props) {
    const bottomRef = useRef(null);
    let jsxParts = [];
    let hints = [],
        hintCount = 0,
        nextHintBtn = "";
    if (props.hints && props.hints.length > 0) {
        hints = props.hints;
    }
    hints.forEach((h) => {
        if (hintCount++ < props.hintsToShow) {
            jsxParts.push(
                <div>
                    <Latex>{h.hint}</Latex>
                </div>,
            );
        }
    });
    let xxx = jsxParts.map((p, k) => {
        let cls =
            k < jsxParts.length - 1
                ? "text-slate-400 p-2 mx-2"
                : "text-slate-600 bg-slate-100 rounded-lg p-2 mx-2";
        return (
            <div key={k} className={`my-4 ${cls}`}>
                {p}
            </div>
        );
    });

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView();
    };

    async function nextHint() {
        await props.nextHint();
        scrollToBottom()
    }

    function prevHint() {
        props.prevHint();
    }

    let moreHints = props.hintsToShow < hints.length;
    let onClk = nextHint;
    let nextHntCls = "cursor-pointer text-black";
    if (!moreHints) {
        onClk = () => {};
        nextHntCls = "text-slate-200";
    }

    let moreHintsP = props.hintsToShow > 1;
    let onClkP = prevHint;
    let prevHntCls = "cursor-pointer text-black";
    if (!moreHintsP) {
        onClkP = () => {};
        prevHntCls = "text-slate-200";
    }

    return (
        <div className="mx-auto my-6 max-w-5xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} maxWidth="5xl">
                <div
                    className={`bg-white p-1 shadow sm:rounded-lg flex flex-row max-w-5xl h-[90lvh] py-4 my-4`}
                >
                    <div className="flex flex-col min-w-[20%] max-h-dvh overflow-y-hidden ">
                        <div
                            className={`${nextHntCls} cursor-pointer bg-white p-2 m-2 rounded-lg`}
                            onClick={onClk}
                        >
                            siguiente paso
                        </div>
                        <div
                            className={`${prevHntCls} cursor-pointer bg-white p-2 m-2 rounded-lg`}
                            onClick={onClkP}
                        >
                            paso anterior
                        </div>
                        <div
                            className="cursor-pointer bg-white p-2 m-2 rounded-lg"
                            onClick={props.onClose}
                        >
                            cerrar
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col max-h-dvh overflow-y-auto ">{xxx}</div>
                        <div ref={bottomRef} className="mb-8"></div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
