import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { PatientsFilterProps } from "../types/Patients"

const PatientsFilter: React.FC<PatientsFilterProps> = ({ 
        sexFilter, 
        ageRangeFilter, 
        statusFilter, 
        onFilterChange 
    }) => {
        
    const filters = [
        {
            id: 'sex',
            name: 'Sex',
            options: [
                { value: 'All', label: 'All' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
            ],
            current: sexFilter
        },
        {
            id: 'age',
            name: 'Age',
            options: [
                { value: 'All', label: 'All' },
                { value: '0-18', label: '0-18' },
                { value: '19-65', label: '19-65' },
                { value: '65+', label: '65+' }
            ],
            current: ageRangeFilter
        },
        {
            id: 'status',
            name: 'Status',
            options: [
                { value: 'All', label: 'All' },
                { value: 'Normal', label: 'Normal' },
                { value: 'Emergency', label: 'Emergency' }
            ],
            current: statusFilter
        }
    ]

    const getCurrentLabel = (id: string) => {
        const filter = filters.find(f => f.id === id)
        return filter?.options.find(opt => opt.value === filter.current)?.label || 'Select'
    }

    return (
        <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            
            {filters.map((filter) => (
                <Menu as="div" key={filter.id} className="relative inline-block">
                    <div>
                        <MenuButton className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none">
                            {filter.name}: {getCurrentLabel(filter.id)}
                            <ChevronDownIcon className="size-3 fill-white/60 ml-1" />
                        </MenuButton>
                    </div>

                    <MenuItems className="absolute left-0 z-10 mt-1 w-40 origin-top-left rounded-lg bg-white shadow-lg focus:outline-none">
                        <div className="py-1">
                            {filter.options.map((option) => (
                                <MenuItem key={option.value}>
                                        <button
                                            onClick={() => onFilterChange(filter.id as any, option.value)}
                                            className={`block w-full px-4 py-2 text-left text-sm
                                                ${option.value === filter.current ? "bg-red-200 font-medium" : ""}
                                                data-[active]:bg-gray-100`}
                                        >
                                            {option.label}
                                        </button>
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>
            ))}
        </div>
    )
}

export default PatientsFilter