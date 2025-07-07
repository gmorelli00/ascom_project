import { Fragment, useEffect, useState} from "react";
import PatientGrid from "../components/PatientGrid";
import PatientsIndex from "../components/PatientsIndex";
import type { Patient, SortField, SexFilter, AgeRangeFilter, StatusFilter } from "../types/Patients";
import PatientsFilter from "../components/PatientsFilter";
import api from "../services/api";
import FilterSortPatients from "../types/FilterSortPatients";

function PatientsListPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filterText, setFilterText] = useState("");
    const [sexFilter, setSexFilter] = useState<SexFilter>('All');
    const [ageRangeFilter, setAgeRangeFilter] = useState<AgeRangeFilter>('All');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
    const { sortedPatients } = FilterSortPatients(
        patients,
        filterText,
        sexFilter,
        ageRangeFilter,
        statusFilter,
        sortField,
        sortAsc
    );

    useEffect(() => {
        api.get('/Patient/GetList').then((res) => {
            setPatients(res.data);
        });
    }, []);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            if (sortAsc) {
                setSortAsc(false);
            } else {
                setSortField(null);
            }
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    return (
        <Fragment>
            <div className="px-40 py-15">
                <div className="flex w-full justify-between items-center mb-5">
                    <h1 className="text-2xl font-thin">Patients list</h1>
                    <div className="flex gap-5">
                        <PatientsFilter
                            sexFilter={sexFilter}
                            ageRangeFilter={ageRangeFilter}
                            statusFilter={statusFilter}
                            onFilterChange={(type, value) => {
                                if (type === 'sex') setSexFilter(value as SexFilter);
                                if (type === 'age') setAgeRangeFilter(value as AgeRangeFilter);
                                if (type === 'status') setStatusFilter(value as StatusFilter);
                            }}
                        />
                        <input
                            type="text"
                            className="mb-4 p-2 shadow-md rounded-lg bg-white focus:outline-none"
                            placeholder="Search by name..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                </div>
                <PatientsIndex onSort={handleSort} sortField={sortField} sortAsc={sortAsc} />
                <PatientGrid patients={sortedPatients} />
            </div>
        </Fragment>
    );
}

export default PatientsListPage;