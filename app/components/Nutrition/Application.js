// Importiere notwendige Hooks von React
import { useEffect, useState } from "react";

// Die Application-Komponente nimmt nutrition, updateContext, amount und setAmount als Props
export default function Application({ nutrition, updateContext}) {
  // Zustände für Stunden und Einheiten, mit Initialwerten
  const [hours, setHours] = useState(1);
  const [units, setUnits] = useState(0);

  // Aktualisiert die Menge basierend auf der Eingabe des Benutzers und aktualisiert den Kontext
  const handleAmountUpdate = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return; // Beende früh, wenn der Wert NaN ist
    const newAmount = value * hours * nutrition.portionSize;
    setUnits(value); // Speichert die Einheiten
    updateContext({amount: newAmount});
  };

  // Aktualisiert die Stunden basierend auf der Eingabe des Benutzers und aktualisiert den Kontext
  const handleHourUpdate = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return; // Beende früh, wenn der Wert NaN ist
    const newAmount = units * value * nutrition.portionSize;
    setHours(value); // Setzt die neuen Stunden
    updateContext({amount: newAmount});
  };

    const isOral = () => nutrition.application === "oral-portion";

  // Effekt, der bei Änderungen an der Anwendungsart der Ernährung reagiert
  useEffect(() => {
    const newHours = isOral() ? 1 : 24; // Stellt Stunden ein basierend auf der Anwendungsart
    const newUnits = 0; // Stellt Einheiten ein basierend auf der Anwendungsart
    const newAmount = newUnits * newHours * nutrition.portionSize;
    setHours(newHours);
    setUnits(newUnits);
    updateContext({amount: newAmount});
  }, [nutrition.energy, nutrition.carbs, nutrition.fat, nutrition.protein, nutrition.application]);

  // Render-Methode der Komponente
  return (
    <div>
      <div className="flex flex-row gap-5 items-center">
        <p className="w-20">{isOral() ? "Portionen: " : "Laufrate: "}</p>
        <input
          className="h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ml-1"
          type="range"
          min={0}
          max={isOral() ? 10 : 120} // Max-Wert basierend auf der Anwendungsart
          value={units}
          onChange={handleAmountUpdate}
        />
        <p className="min-w-[120px]">
          {units} {isOral() ? " Portionen" : " ml/h"}
        </p>
      </div>
      {!isOral() && (
        <div className="flex flex-row gap-5 items-center">
          <p className="w-20">Für: </p>
          <input
            className="h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ml-1"
            type="range"
            min={0}
            max={24}
            value={hours}
            onChange={handleHourUpdate}
          />
          <p className="min-w-[120px]">{hours} Stunden/Tag</p>
        </div>
      )}
      <p className="text-center mt-4">Gesamt: {isOral() ? `${nutrition.amount} ml` : `${nutrition.amount} ml`}</p>
    </div>
  );
}
