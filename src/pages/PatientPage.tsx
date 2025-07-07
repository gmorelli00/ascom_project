import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import type { Patient } from "../types/Patients";
import api from "../services/api";
import PatientDetails from "../components/PatientDetails";
import ParametersGrid from "../components/ParametersGrid";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function PatientPage() {
    const { id } = useParams();
    const [patient, setPatients] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!id) return;
        api.get(`/Patient/Get/${id}`).then((res) => {
            setPatients(res.data);
        }) .catch((err) => {
            console.error("Errore nel caricamento del paziente:", err);
        }) .finally(() => {
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Caricamento...</div>;
    }

    if (!patient) {
        return <div className="p-10 text-center text-red-500">Paziente non trovato</div>;
    }

    return (
        <Fragment>
            <div className="px-40 py-15">
                <div className="flex w-full justify-between items-center mb-5">
                    <button
                        className="flex items-center border-none cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    </button>
                    <h1 className="text-2xl font-thin">Patient Details</h1>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate(`/${patient.id}/edit`, { state: { backgroundLocation: location } })}
                    >
                        Edit
                    </button>
                </div>
                <PatientDetails patient={patient} />
                <ParametersGrid parameters={patient.parameters}/>
            </div>
        </Fragment>
    );
}

export default PatientPage;