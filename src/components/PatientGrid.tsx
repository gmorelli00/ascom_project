import type { PatientGridProps } from '../types/Patients';
import { useNavigate } from 'react-router-dom';

function PatientGrid({ patients }: PatientGridProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      {patients.map((p) => (
        <div
          key={p.id}
          className="h-20 flex flex-row w-full items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/${p.id}`)}
        >
          <div className="flex justify-center items-center w-1/10">
            <img
              src={`https://ui-avatars.com/api/?name=${p.givenName}+${p.familyName}&background=random`}
              className="w-10 h-10 rounded-full"
            />
          </div>
          

          <div className="basis-1/6 text-sm font-semibold">{p.familyName}</div>

          <div className="basis-1/6 text-sm font-semibold">{p.givenName}</div>

          <div className="basis-1/6 text-xs text-gray-500">{p.sex}</div>

          <div className="basis-1/6 text-sm text-gray-700">
            {new Date(p.birthDate).toLocaleDateString()}
          </div>

          <div className="basis-1/6 text-sm text-gray-700">
            {p.parameters?.length ?? 0} Parameters
          </div>

          <div className="basis-1/6 text-sm">
            {p.parameters?.some(param => param.alarm) ? (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">Emergency</span>
            ) : (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">Normal</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


export default PatientGrid;