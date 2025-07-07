import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Patient } from "../types/Patients";
import api from "../services/api";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function EditPatient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const sexes = [
        { label: "M", value: "M" },
        { label: "F", value: "F" },
    ];

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    useEffect(() => {
        if (!id) return;
        api.get(`/Patient/Get/${id}`)
            .then((res) => setPatient(res.data))
            .catch((err) => console.error("Error:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!patient) return;
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!patient) return;
        api.post(`/Patient/Update`, patient)
            .then(() => {
                window.location.href = `/${patient.id}`;
            }) .catch((err) => {
                console.error("Error:", err);
            });
    };

    if (loading)
        return <div className="p-10 text-center">Loading...</div>;
    if (!patient)
        return (
            <div className="p-10 text-center text-red-500">Patient not found</div>
    );

    return (
        <Fragment>
            <div className="fixed inset-0 backdrop-invert backdrop-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-10 w-[500px] shadow-lg relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    >
                    ✕
                    </button>
                    <h2 className="text-xl font-bold mb-4">Edit patient</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Given name</label>
                            <input
                                type="text"
                                name="givenName"
                                value={patient.givenName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Family name</label>
                            <input
                                type="text"
                                name="familyName"
                                value={patient.familyName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Sex</label>
                            <Menu as="div" className="relative">
                                <MenuButton className="w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 mt-1 bg-white">
                                    {sexes.find((s) => s.value === patient.sex)?.label || "Select..."}
                                    <ChevronDownIcon className="size-3 fill-white/60 ml-1" />
                                </MenuButton>
                                <MenuItems className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {sexes.map((s) => (
                                        <MenuItem key={s.value}>
                                                <button
                                                    type="button"
                                                    onClick={() => setPatient({ ...patient, sex: s.value })}
                                                    className={`w-full text-left px-4 py-2 text-sm
                                                    ${patient.sex === s.value ? "bg-red-200 font-medium" : ""}
                                                    data-[active]:bg-gray-100`}
                                                >
                                                {s.label}
                                                </button>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Birth date</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={patient.birthDate.split("T")[0]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                max={new Date().toISOString().split("T")[0]} // oggi come massimo
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-lg"
                            >
                            Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
                            >
                            Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default EditPatient;

