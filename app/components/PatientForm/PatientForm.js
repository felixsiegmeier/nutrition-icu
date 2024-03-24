"use client"

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { weightCorrectionInfo } from "./WeightCorrectionInfo";
import {useState } from "react";
import CustomPopover from "../CustomPopover";
import { useAppContext } from "@/app/Context/AppContextProvider";
import { getCalcWeight } from "@/app/utils/helpers";

export default function PatientForm() {

    const {patientParams, setPatientParams, bmi, calculationMode, setCalculationMode} = useAppContext();
    
    // Verwaltet den Zustand für das Anker-Element des Popovers.
    const [anchor, setAnchor] = useState(null);
    
    // Funktion zur Behandlung von Änderungen in den Eingabefeldern für numerische Werte.
    function handleInputChange(property, e) {
        const value = e.target.value;
        // Erlaubt nur numerische Eingaben; leere Eingaben werden auch zugelassen.
        if (value === "" || /^[0-9]+$/.test(value)) {
            setPatientParams({...patientParams, [property]: parseFloat(value)})// Konvertiert den String in eine Fließkommazahl.
        }
    }

    // Funktion zur Behandlung von Änderungen im Berechnungsmodus für Korrekturen.
    function handleModeChange(e) {
        setCalculationMode(e.target.value) // Aktualisiert den Berechnungsmodus.
    }
      
    // Render-Funktion der Komponente.
    return (
        <div className="flex flex-col gap-4 items-start">
            {/* Überschrift */}
            <h2 className="text-2xl mt-6 mb-2 self-center">Kenngrößen</h2>
            {/* Auswahl für den Korrekturmodus */}
            <div className="flex flex-row gap-5 items-center">
                <p className="w-20 ">Korrektur:</p>
                <select
                    value={calculationMode}
                    onChange={handleModeChange}
                    className="border rounded-md text-black p-1 cursor-pointer outline-none"
                >
                    {/* Optionen für verschiedene Korrekturmodi */}
                    <option value={1}>IBW</option>
                    <option value={2}>ABW</option>
                    <option value={3}>RBW</option>
                </select>
                {/* Hilfe-Icon mit Popover für zusätzliche Informationen */}
                <HelpOutlineIcon onMouseEnter={(e) => setAnchor(e.currentTarget)} onMouseLeave={() => setAnchor(null)} />
                <CustomPopover content={weightCorrectionInfo} anchor={anchor} setAnchor={setAnchor} />
            </div>
            {/* Eingabefelder für Größe und Gewicht mit entsprechenden Labels */}
            <div className="flex flex-row gap-5 items-center">
                <p className="w-20">Größe:</p>
                <input
                    type="text"
                    value={patientParams.height}
                    className="text-black text-center w-20 p-1 border rounded-md outline-none"
                    onChange={(e) => handleInputChange("height", e)}
                />
                <p>cm</p>
            </div>
            <div className="flex flex-row gap-5 items-center">
                <p className="w-20">Gewicht:</p>
                <input
                    type="text"
                    value={patientParams.weight}
                    className="text-black text-center w-20 p-1 border rounded-md outline-none"
                    onChange={(e) => handleInputChange("weight", e)}
                />
                <p>kg</p>
            </div>
            
            {/* Anzeige des berechneten BMI */}
            <p className="text-orange-300 mt-2 self-center">BMI: {bmi} kg/m²</p>
            <p className="text-orange-300 self-center">Gewicht nach {["IBW", "ABW", "RBW"][calculationMode-1]}:</p>
            <p className="text-orange-300 -mt-4 self-center">{getCalcWeight({...patientParams, calcMode: calculationMode})} kg</p>
        </div>
    );
}
