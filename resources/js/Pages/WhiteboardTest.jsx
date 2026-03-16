import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export default function WhiteboardTest(props) {

    return (
        <AuthenticatedLayout header={false}>
            <div className="py-2">
                <div className="bg-black p-2 h-screen">
                    <Excalidraw />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
