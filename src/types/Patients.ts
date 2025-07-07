interface Parameter {
    id: number;
    name: string;
    value: string;
    alarm: boolean;
}

interface Patient {
    id: number;
    familyName: string;
    givenName: string;
    birthDate: string;
    sex: string;
    parameters: Parameter[];
}

interface PatientGridProps {
    patients: Patient[];
}

interface ParametersGridProps {
    parameters: Parameter[];
}

type SortField = keyof Patient | 'parameterCount' | 'alarmStatus';

interface PatientsIndexProps {
    onSort: (field: SortField) => void;
    sortField: SortField | null;
    sortAsc: boolean;
}

type SexFilter = 'All' | 'Male' | 'Female' | 'Other';
type AgeRangeFilter = 'All' | '0-18' | '19-65' | '65+';
type StatusFilter = 'All' | 'Normal' | 'Emergency';

interface PatientsFilterProps {
    sexFilter: SexFilter;
    ageRangeFilter: AgeRangeFilter;
    statusFilter: StatusFilter;
    onFilterChange: (type: 'sex' | 'age' | 'status', value: string) => void;
}


function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate()))
        age--;

    return age;
}



export type { Patient, Parameter, PatientGridProps, ParametersGridProps, PatientsIndexProps, SortField, SexFilter, AgeRangeFilter, StatusFilter, PatientsFilterProps };
export { calculateAge };