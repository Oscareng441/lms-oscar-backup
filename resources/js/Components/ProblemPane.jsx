import { useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import HybridDisplay from "@/Components/HybridDisplay";
import FillInTheBlanksDisplay from "@/Components/FillInTheBlanksDisplay";

export default function ProblemPane(props) {
    let problemSection;
    if (props.problem.display_type === "text") {
        // deprecate; use html
        problemSection = (
            <div
                dangerouslySetInnerHTML={{ __html: props.problem.problem_text }}
            />
        );
    }
    if (props.problem.display_type === "html") {
        problemSection = (
            <div
                dangerouslySetInnerHTML={{ __html: props.problem.problem_text }}
            />
        );
    }
    if (props.problem.display_type === "latex") {
        problemSection = <Latex>{props.problem.problem_text}</Latex>;
    }
    if (props.problem.display_type === "pdf") {
        problemSection = (
            <iframe
                src={`/storage/${pageAssets.pdf}.pdf`}
                style={{ width: "900px", height: "1200px" }}
                frameBorder="0"
            />
        );
    }
    if (props.problem.display_type === "hybrid") {
        problemSection = <HybridDisplay content={props.problem.problem_text} />;
    }
    if (props.problem.display_type === "ranuras") {
        problemSection = (
            <FillInTheBlanksDisplay
                content={props.problem.problem_text}
                chosenAnswers={props.selectedAnswers}
                setSelectedAnswers={props.setSelectedAnswers}
            />
        );
    }

    return (
        <>
            <div className="text-center bg-white p-1 shadow text-xs sm:text-base rounded-lg sm:p-8">
                {problemSection}
            </div>
        </>
    );
}
