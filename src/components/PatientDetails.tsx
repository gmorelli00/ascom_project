import type { Patient } from "../types/Patients";
import { Fragment } from "react";

type Props = {
    patient: Patient;
};

function PatientDetails({ patient }: Props) {
    return (
        <Fragment>
            <div className="space-y-2">
                <div className="h-20 flex flex-row items-center w-full p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="justify-center items-center w-1/10">
                        <img
                        src={`https://ui-avatars.com/api/?name=${patient.givenName}+${patient.familyName}&background=random`}
                        className="w-10 h-10 rounded-full"
                        />
                    </div>

                    <div className="basis-1/6 flex flex-col">
                        <div className="text-sm text-gray-700">Family name:</div>
                        <div className="font-semibold text-sm">{patient.familyName}</div>
                    </div>

                    <div className="basis-1/6">
                        <div className="text-sm text-gray-700">Given name:</div>
                        <div className="font-semibold text-sm">{patient.givenName}</div>
                    </div>

                    <div className="basis-1/6 text-sm text-gray-700">
                        <div className="text-sm">Sex:</div>
                        <div className="text-xs text-gray-500">{patient.sex}</div>
                    </div>

                    <div className="basis-1/6 text-sm text-gray-700">
                        <div className="text-sm">Birth date:</div>
                        {new Date(patient.birthDate).toLocaleDateString()}
                    </div>

                    <div className="basis-1/6 text-sm text-gray-700">
                        <div className="text-sm">Parameters:</div>
                        {patient.parameters?.length ?? 0} Parameters
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PatientDetails;
