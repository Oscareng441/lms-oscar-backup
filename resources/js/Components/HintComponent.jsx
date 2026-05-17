import { useEffect, useRef } from "react";
import Modal from "@/Components/Modal";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function HintComponent(props) {
    const bottomRef = useRef(null);
    const hints = props.hints ? props.hints.slice(0, props.hintsToShow) : [];
    const moreHints = props.hintsToShow < (props.hints?.length || 0);
    const moreHintsP = props.hintsToShow > 1;

    useEffect(() => {
        if (props.show) {
            bottomRef.current?.scrollIntoView({
                block: "end",
                behavior: "smooth",
            });
        }
    }, [props.show, props.hintsToShow]);

    return (
        <div className="mx-auto my-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} maxWidth="5xl">
                <div className="flex h-[88vh] flex-col overflow-hidden rounded-3xl bg-white shadow-xl sm:h-[80vh]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                        <div>
                            <div className="text-lg font-semibold text-slate-900">
                                Pistas
                            </div>
                            <div className="text-sm text-slate-500">
                                Utiliza estos pasos para entender el problema.
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={props.prevHint}
                                disabled={!moreHintsP}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                    moreHintsP
                                        ? "bg-slate-900 text-white hover:bg-slate-800"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                Paso anterior
                            </button>
                            <button
                                type="button"
                                onClick={props.nextHint}
                                disabled={!moreHints}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                    moreHints
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                Siguiente paso
                            </button>
                            <button
                                type="button"
                                onClick={props.onClose}
                                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6">
                        <div className="mb-4 flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                            <span>
                                Paso{" "}
                                {Math.min(
                                    props.hintsToShow,
                                    props.hints?.length || 0,
                                )}{" "}
                                de {props.hints?.length || 0}
                            </span>
                            <span className="text-slate-500">
                                {props.hints?.length
                                    ? "Desplázate para leer más"
                                    : "No hay pistas disponibles"}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {hints.length ? (
                                hints.map((h, k) => (
                                    <div
                                        key={k}
                                        className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-800 shadow-sm"
                                    >
                                        <Latex>{h.hint}</Latex>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                                    No hay pistas para este problema.
                                </div>
                            )}
                            <div ref={bottomRef} className="h-6" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
