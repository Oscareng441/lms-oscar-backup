import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Select from "react-select";
import SourceForm from "@/Components/SourceForm";

export default function CreditsComponent(props) {
    const [showForm, setShowForm] = useState(false);
    const [credits, setCredits] = useState(props.credits);
    const [creditsId, setCreditsId] = useState(props.selected);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        let opts = credits.map((c) => {
            return { key: c.id, value: c.id, label: c.name };
        });
        console.log(opts, credits, creditsId);
        let sel = null;
        opts.some((x) => {
            console.log();
            if (x.value == creditsId) {
                sel = x;
                return true;
            }
            return false;
        });
        setOptions(opts);
        setSelectedOption(sel);
    }, [creditsId]);

    const toggleShowForm = () => {
        setShowForm(!showForm);
    };

    const closeCreditsModal = () => {
        setShowForm(false);
    };

    function addOption(src) {
        let c = [...credits];
        let op = [...options];
        c.push[src];
        setCreditsId(src.id);
        let newOpt = { value: src.id, label: src.name };
        setCredits(c);
        setOptions([...options, newOpt]);
        setSelectedOption(newOpt);
    }

    const handleChange = (e) => {
        let id = e.value;
        setCreditsId(id);
        console.log("handleChange", id);
        props.onChange(id);
    };

    return (
        <div className="mx-auto my-6 w-7xl space-y-6 sm:px-6 lg:px-8">
            <Select
                options={options}
                placeholder="Selecciona una fuente (opcional)..."
                onChange={handleChange}
                isClearable={true}
                value={selectedOption}
            />
            <button onClick={toggleShowForm}>+ Fuente Nueva</button>
            <Modal show={showForm} onClose={closeCreditsModal}>
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <SourceForm
                        source={{}}
                        afterSubmit={(n) => {
                            addOption(n);
                            setShowForm(false);
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
}
