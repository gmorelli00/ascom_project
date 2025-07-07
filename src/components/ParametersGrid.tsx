    import type { ParametersGridProps } from "../types/Patients";
    import { Fragment } from "react";


    function ParametersGrid({parameters}: ParametersGridProps) {
        return (
            <Fragment> 
                <div className="flex w-full justify-center mt-5">
                    <div className="space-y-2 w-3/4 flex flex-col justify-center">
                        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
                            <div className="basis-1/3 text-sm font-bold">Name</div>
                            <div className="basis-1/3 text-sm font-bold">Value</div>
                            <div className="basis-1/3 text-center text-sm font-bold">Status</div>
                        </div>
                        {parameters.map((p) => (
                            <div key={p.id} className="h-15 flex items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                                <div className="basis-1/3">
                                    <div className="font-semibold text-sm">{p.name}</div>
                                </div>

                                <div className="basis-1/3">
                                    <div className="font-semibold text-sm">{p.value}</div>
                                </div>

                                <div className="basis-1/3 text-sm flex justify-center">
                                    {p.alarm ? (
                                        <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">Emergency</span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-600">Normal</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>      
            </Fragment>
        );
    }

    export default ParametersGrid;