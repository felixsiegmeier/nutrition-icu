"use client";
import { useAppContext } from "@/app/Context/AppContextProvider";
import Slider from "./Slider";
import DemandPresets from "./DemandPresets";
import { createSliderConfig } from "./createSliderConfig";

export default function Demand() {
  const { demand, setDemand, linkDemand, setLinkDemand } = useAppContext();

  function handleChange(property, factor, value) {
    const newValue = Math.round(value * factor * 10) / 10; // Für Eingaben mit einer Nachkommastelle
  
    if (linkDemand) {
      if (property === "energy") {
        // Die neue Gesamtenergie direkt setzen
        const newEnergy = Math.round(newValue); // Runde energy ohne Nachkommastelle
  
        // Berechne das Gesamtgewicht der aktuellen Makronährstoffe in Gramm
        const totalGrams = demand.carbs + demand.protein + (demand.fat * (9/4));
        // Berechne die neue Verteilung der Makronährstoffe basierend auf der neuen Energie
        if (totalGrams > 0) { // Vermeidung einer Division durch 0
          const carbsFraction = (demand.carbs / totalGrams) * (newEnergy / 4);
          const proteinFraction = (demand.protein / totalGrams) * (newEnergy / 4);
          const fatFraction = ((demand.fat * (9/4)) / totalGrams) * (newEnergy / 4);
  
          setDemand({
            ...demand,
            energy: newEnergy,
            carbs: Math.round(carbsFraction * 10) / 10,
            protein: Math.round(proteinFraction * 10) / 10,
            fat: Math.round((fatFraction * 4 / 9) * 10) / 10, // Umrechnung zurück in die Menge Fett
          });
        }
      } else if (["carbs", "protein", "fat"].includes(property)) {
        // Update the specific macronutrient and recalculate the total energy
        const update = { ...demand, [property]: newValue };
        update.energy = Math.round((update.carbs + update.protein) * 4 + update.fat * 9);
  
        setDemand(update);
      }
    } else {
      // Wenn linkDemand nicht aktiv ist, aktualisiere nur den spezifischen Wert
      if (property === "energy") {
        setDemand({ ...demand, [property]: Math.round(newValue) }); // Energy ohne Nachkommastelle
      } else {
        setDemand({ ...demand, [property]: newValue });
      }
    }
  }  
  

  const slidersConfig = createSliderConfig(demand, handleChange);

  return (
    <div className="flex flex-col gap-4 items-start">
      <h2 className="text-2xl mt-6 mb-2 self-center">Bedarf</h2>
      <div className="flex flex-row gap-5 self-center">
        <p>Werte koppeln</p>
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={linkDemand}
            onChange={() => setLinkDemand((prev) => !prev)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Green
          </span>
        </label>
      </div>
      <DemandPresets />
      {slidersConfig.map((sliderProps, index) => (
        <Slider key={index} {...sliderProps} />
      ))}
    </div>
  );
}
