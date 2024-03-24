"use client"

import { useAppContext } from "@/app/Context/AppContextProvider";
import { getCalcWeight } from "@/app/utils/helpers";

export default function NutritionSum() {
    const { patientParams, allNutrition, demand, calculationMode } = useAppContext();

    const calcWeight = () => getCalcWeight({...patientParams, calcMode: calculationMode});

    const getParamsSum = (param) => {
        return allNutrition.reduce((sum, nutrition) => sum + (param === "energy" ? nutrition[param] * nutrition.amount : nutrition[param] * nutrition.amount / 100), 0);
    };

    const getParamDemand = (param) => {
        return calcWeight() * demand[param];
    };

    const getVolume = () => {
        return allNutrition.reduce((total, nutrition) => total + nutrition.amount, 0);
    };

    const getCoveragePercentage = (param) => {
        const sum = getParamsSum(param);
        const demand = getParamDemand(param);
        return Math.round((sum / demand) * 100);
    };

    const nutritionParams = [
        { key: "energy", label: "Energie (kcal)" },
        { key: "carbs", label: "Kohlenhydrate (g)" },
        { key: "protein", label: "Eiweiß (g)" },
        { key: "fat", label: "Fett (g)" },
    ];

    return (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-40 mt-8">
                <table className="w-full text-center text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-slate-700">
                        <tr>
                            <th scope="col" className="py-3 text-left px-6">Nährwert</th>
                            <th scope="col" className="py-3 px-6">Verabreicht</th>
                            <th scope="col" className="py-3 px-6">Bedarf</th>
                            <th scope="col" className="py-3 px-6">Deckung (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700">
                            <td className="py-4 text-left px-6">Volumen (ml)</td>
                            <td className="py-4 px-6">{getVolume()}</td>
                            <td className="py-4 px-6">-</td>
                            <td className="py-4 px-6">-</td>
                        </tr>
                        {nutritionParams.map(({ key, label }) => (
                            <tr key={key} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700">
                                <th scope="row" className="py-4 text-left px-6">{label}</th>
                                <td className="py-4 px-6">{Math.round(getParamsSum(key))}</td>
                                <td className="py-4 px-6">{Math.round(getParamDemand(key))}</td>
                                <td className="py-4 px-6">{getCoveragePercentage(key)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}
