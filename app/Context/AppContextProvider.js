"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const [patientParams, setPatientParams] = useState({
    weight: 80, // Gewicht in Kilogramm
    height: 175, // Höhe in Zentimetern
  });
  const [bmi, setBmi] = useState(0);
  const [calculationMode, setCalculationMode] = useState(2);
  const [linkDemand, setLinkDemand] = useState(false);
  const [demand, setDemand] = useState({
    energy: 24,
    carbs: 3,
    protein:.9,
    fat: .9
  });
  const [allNutrition, setAllNutritions] = useState([])

  // Berechnet den BMI, wenn sich Gewicht oder Größe ändern
  useEffect(() => {
    const newBmi =
      !patientParams.weight || !patientParams.height
        ? 0
        : Math.round(
            patientParams.weight / Math.pow(patientParams.height / 100, 2)
          );
    setBmi(newBmi);
  }, [patientParams.weight, patientParams.height]);

  // Setzt Größe oder Gewicht auf 0, wenn sie NaN sind
  useEffect(() => {
    if (!patientParams.weight) {
      setPatientParams({ ...patientParams, weight: 0 });
    }
    if (!patientParams.height) {
      setPatientParams({ ...patientParams, height: 0 });
    }
  }, [patientParams.weight, patientParams.height]);

  // Setzt die Energie auf die Summe der 3 Bestandteile, wenn demandLink true wird
  useEffect(() => {
    if (linkDemand) {
      // Definieren der Defaultwerte für carbs, protein und fat
      const defaultValues = { carbs: 3, protein: 0.9, fat: 0.9 }; // Beispielwerte
  
      // Überprüfen, ob einer der Werte 0 ist und entsprechend die Defaultwerte verwenden
      const updatedValues = {
        carbs: demand.carbs === 0 ? defaultValues.carbs : demand.carbs,
        protein: demand.protein === 0 ? defaultValues.protein : demand.protein,
        fat: demand.fat === 0 ? defaultValues.fat : demand.fat,
      };
  
      // Berechnung der Gesamtenergie basierend auf den aktualisierten oder default Werten
      const energyFromMacros =
        updatedValues.carbs * 4 + updatedValues.protein * 4 + updatedValues.fat * 9;
  
      // Aktualisieren des States mit den neuen Werten für carbs, protein, fat und energy
      setDemand({
        ...demand,
        energy: Math.round(energyFromMacros),
        carbs: updatedValues.carbs,
        protein: updatedValues.protein,
        fat: updatedValues.fat,
      });
    }
  }, [linkDemand, demand.carbs, demand.protein, demand.fat]);
  

  // entkoppelt die Werte und setzt alle auf 0, wenn energy 0 wird
  useEffect(() => {
    if(demand.energy === 0){
      setLinkDemand(false)
      setDemand({
        energy: 0,
    carbs: 0,
    protein:0,
    fat: 0,
      })
    }
  }, [demand.energy])
  

  return (
    <AppContext.Provider
      value={{
        patientParams,
        setPatientParams,
        bmi,
        calculationMode,
        setCalculationMode,
        demand,
        setDemand,
        linkDemand,
        setLinkDemand,
        allNutrition, setAllNutritions
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
