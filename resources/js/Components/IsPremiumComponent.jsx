import { FaLock } from "react-icons/fa";

export default function IsPremiumComponent(props) {
    console.log(props);
    let color = props.hasAccess ? "slate-400" : "yellow-600";
    return (
        <div className="py-4">
            <FaLock size={12} className={`text-${color}`} />
        </div>
    );
}
