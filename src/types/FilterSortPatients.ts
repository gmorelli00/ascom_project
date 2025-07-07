import { useMemo } from "react";
import type { Patient, SortField, SexFilter, AgeRangeFilter, StatusFilter } from "../types/Patients";
import { calculateAge } from "../types/Patients";

function FilterSortPatients(
    patients: Patient[],
    filterText: string,
    sexFilter: SexFilter,
    ageRangeFilter: AgeRangeFilter,
    statusFilter: StatusFilter,
    sortField: SortField | null,
    sortAsc: boolean
    ) {

    const filteredPatients = useMemo(() => {
        return patients.filter((p) => {
            const search = filterText.toLowerCase();
            const nameMatch = p.givenName.toLowerCase().includes(search) ||  p.familyName.toLowerCase().includes(search);
            if (!nameMatch) return false;

            const normalizeSex = (sex: string) => {
                if (sex === 'M') return 'Male';
                if (sex === 'F') return 'Female';
                return sex;
            };
            if (sexFilter !== 'All' && normalizeSex(p.sex) !== sexFilter) return false;

            const age = calculateAge(p.birthDate);
            if (ageRangeFilter === '0-18' && age > 18) return false;
            if (ageRangeFilter === '19-65' && (age < 19 || age > 65)) return false;
            if (ageRangeFilter === '65+' && age <= 65) return false;

            const hasAlarm = p.parameters?.some(param => param.alarm);
            if (statusFilter === 'Emergency' && !hasAlarm) return false;
            if (statusFilter === 'Normal' && hasAlarm) return false;

            return true;
        });
    }, [patients, filterText, sexFilter, ageRangeFilter, statusFilter]);

    const sortedPatients = useMemo(() => {
        return [...filteredPatients].sort((a, b) => {
            if (!sortField) return 0;

            if (sortField === 'parameterCount') {
                return sortAsc ? (a.parameters?.length ?? 0) - (b.parameters?.length ?? 0)
                    : (b.parameters?.length ?? 0) - (a.parameters?.length ?? 0);
            }

            if (sortField === 'alarmStatus') {
                const aAlarm = a.parameters?.some(p => p.alarm) ? 1 : 0;
                const bAlarm = b.parameters?.some(p => p.alarm) ? 1 : 0;
                return sortAsc ? aAlarm - bAlarm : bAlarm - aAlarm;
            }

            const aVal = a[sortField];
            const bVal = b[sortField];

            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }

            return 0;
        });
    }, [filteredPatients, sortField, sortAsc]);

    return { filteredPatients, sortedPatients };
}

export default FilterSortPatients;