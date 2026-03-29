import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import LmsTable from "@/Components/LmsTable";
import Modal from "@/Components/Modal";
import VideoEdit from "@/Components/VideoEdit";

export default function VideoManagementComponent({videos, remove, add, update}) {
    const [selectedVideo, setSelectedVideo] = useState({});
    const [showEditDlg, setShowEditDlg] = useState(false);
    function edit(row) {
        setSelectedVideo(row);
        setShowEditDlg(true);
    }
    function closeEditDlg() {
        setShowEditDlg(false);
    }
    const columns = [
        {
            title: "Nombre",
            field: "name",
            sortable: true,
        },
        {
            title: 'Url',
            field: "url",
            sortable: true,
        },
        {
            title: "",
            displayFormatter: btnCol,
            sortable: false,
        },
    ];

    function btnCol(row) {
        return (
            <div className='flex'>
                <FaPencilAlt
                    className="text-base ml-2 cursor-pointer"
                    onClick={() => edit(row)}
                />
                <FaTrash
                    className="text-base ml-2 cursor-pointer"
                    onClick={() => remove(row)}
                />
            </div>
        )
    }

    return (
        <div className="mx-auto w-full  sm:max-w-7xl space-y-6 video-component">
            <div className="video-component-title flex justify-center items-center">
                Videos 
                <FaPlus
                    className="text-base ml-2 cursor-pointer"
                    onClick={add}
                />
            </div>
            <div className="video-component-list sm:ml-12">
                {
                    <LmsTable
                        columns={columns}
                        data={videos}
                        initialSort="name"
                        hideSearch={true}
                    />
                }
            </div>
            <Modal show={showEditDlg} onClose={closeEditDlg}>
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <VideoEdit 
                        video={selectedVideo} 
                        update={update}
                        close={closeEditDlg}
                    />
                </div>
            </Modal>
        </div>
    );
}
