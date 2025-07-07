import type { SortField, PatientsIndexProps } from "../types/Patients";

function PatientsIndex({ onSort, sortField, sortAsc }: PatientsIndexProps) {
    const renderArrow = (field: SortField) => {
        const isActive = sortField === field;
        const arrow = isActive
            ? (sortAsc ? "▼" : "▲")
            : "▼▲";

        const arrowClass = isActive ? "text-black" : "text-gray-300";

        return <span className={`ml-1 ${arrowClass}`}>{arrow}</span>;
    };

    return (
        <div className="mb-2">
            <div className="flex flex-row items-center p-4 bg-white shadow-m rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex w-1/10">
                </div>

                <div className="basis-1/6 text-sm font-bold"  onClick={() => onSort("familyName")}>
                    Family name{renderArrow("familyName")}
                </div>

                <div className="basis-1/6 text-sm font-bold" onClick={() => onSort("givenName")}>
                    Given name{renderArrow("givenName")}
                </div>

                <div className="basis-1/6 text-sm font-bold" onClick={() => onSort("sex")}>
                    Sex{renderArrow("sex")}
                </div>

                <div className="basis-1/6 text-sm font-bold" onClick={() => onSort("birthDate")}>
                    Birth date{renderArrow("birthDate")}
                </div>

                <div className="basis-1/6 text-sm font-bold" onClick={() => onSort("parameterCount")}>
                    Parameters{renderArrow("parameterCount")}
                </div>

                <div className="basis-1/6 text-sm font-bold" onClick={() => onSort("alarmStatus")}>
                    Status{renderArrow("alarmStatus")}
                </div>
            </div>
        </div>
    );
}

export default PatientsIndex;