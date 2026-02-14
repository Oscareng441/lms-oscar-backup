import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from "@inertiajs/react";
import LmsTable from "@/Components/LmsTable";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Search(props) {
    const [srchText, setSrchText] = useState("");
    const [srchSubmitted, setSrchSubmitted] = useState(false);
    const [data, setData] = useState([]);

    function update(e) {
        let val = e.target.value;
        setSrchText(val);
    }

    function submitSrch() {
    	setSrchSubmitted(true)
        fetch(route("performSearch", { srch: srchText }))
            .then((res) => res.json())
            .then((r) => {
                setData(r.data);
            });
    }

    function watchKeyDown(e) {
    	switch(e.key) {
    	case "Enter":
    		return submitSrch()
    	}
    }

    function xx(row) {
    	switch(row.link_type) {
    	case 'course':
    		return <Link href={`/course/${row.id}`} className="">{ row.name }</Link>
    	case 'chapter':
    		return <Link href={`/chapter/${row.id}`} className="">{ row.name }</Link>
    	case 'lesson':
    		return <Link href={`/lesson/${row.id}`} className="">{ row.name }</Link>
    	case 'problem':
    		return <Link href={`/problem/${row.id}`} className="">{ row.name }</Link>
    	}
    	return row.name // link to item
    }

    const columns = [
        {
            title: "Resultados",
            field: "name",
            displayFormatter: xx,
            sortable: false,
        },
        {
            title: "",
            field: "link_type",
            css: "",
            sortable: false,
        },
        {
            title: "Descripción",
            field: "description",
            css: "",
            sortable: false,
        },
    ];

    return (
        <AuthenticatedLayout header={false}>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 text-center">
                    <input
                        className="mr-4 rounded-lg"
                        type="text"
                        value={srchText}
                        onChange={update}
                        onBlur={submitSrch}
                        onKeyDown={watchKeyDown}
                        placeholder="Qué buscas?"
                    />
                    <PrimaryButton onClick={submitSrch}>Buscar</PrimaryButton>
                </div>
                {srchSubmitted &&
	                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
	                    <LmsTable
	                        columns={columns}
	                        data={data}
	                        initialSort="name"
	                        hideSearch={true}
	                    />
	                </div>
	            }
            </div>
        </AuthenticatedLayout>
    );
}
