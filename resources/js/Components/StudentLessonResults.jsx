export default function StudentLessonResults(props) {
    let txt = "";
    if (props.progress === null || props.progress.total == 0) {
        txt = (
            <span className="p-1 m-1 border rounded-md text-sm bg-yellow-400">
                no hay datos
            </span>
        );
    } else {
        let info = `${props.progress.pct_done}% hecho; ${props.progress.score}% correctos; ${props.progress.total} problemas`;
        let bgCol =
            props.progress.pct_done > 0.99 && props.progress.score > 99
                ? "bg-green-400"
                : "bg-slate-200";
        txt = (
            <span className={`p-1 m-1 border rounded-md ${bgCol} text-sm`}>
                {info}
            </span>
        );
    }

    return <div className="lsn">{txt}</div>;
}
