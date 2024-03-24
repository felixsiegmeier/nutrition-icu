import { useEffect, useState } from "react";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Slider from "./Slider";
import { createSliderConfig } from "./createSliderConfig";
import NutritionSelection from "./NutritionSelection";
import Application from "./Application";
import { useAppContext } from "@/app/Context/AppContextProvider";

export default function NutritionCard({ id, deleteSelf }) {
  const [nutritionData, setNutritionData] = useState([]);
  const [selection, setSelection] = useState("Benutzerdefiniert");
  const {allNutrition, setAllNutritions} = useAppContext();

  const nutritionRef = () => allNutrition.find(nutrition => nutrition.id === id)

  const slidersConfig = createSliderConfig(
    nutritionRef(),
    handleNutritionCompositionChange
  );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/nutritionData");
      const data = await res.json();
      setNutritionData(data);
    }
    fetchData();
  }, []);

  const getNewAllNutritions = (changes) => {
    return allNutrition.map(nutrition => {
      if (nutrition.id === id) {
        return {...nutrition, ...changes};
      }
      return nutrition;
    });
  };
  
  function updateContext(changes) {
    const newAllNutrition = getNewAllNutritions(changes)
    setAllNutritions([...newAllNutrition])
  }

  function handleSelectionChange(e) {
    const newSelection = e.target.value;
    const newNutrition = nutritionData[newSelection];
    setSelection(newSelection);
    updateContext({... newNutrition, amount: 0});
  }

  function handleNutritionCompositionChange(property, factor, value) {
    const newValue = Math.round(value * factor * 100) / 100;
    updateContext({[property]: newValue});
    setSelection("Benutzerdefiniert");
  }

  return (
    <div key={id} className="flex flex-row gap-10 border border-green-700 rounded-md p-6 bg-slate-800 hover:bg-slate-700 hover:border-green-500">
      <div className="flex flex-col mt-10">
        <h3 className="text-xl mb-2 self-center">Nahrung konfigurieren</h3>
        <NutritionSelection
          nutritionData={nutritionData}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
        />
        {slidersConfig.map((sliderProps, index) => (
          <Slider key={index} {...sliderProps} />
        ))}
      </div>
      <div className="flex flex-col mt-10">
      <h3 className="text-xl mb-2 self-center">Portionsgrößen</h3>
      <Application
        nutrition={nutritionRef()}
        updateContext={updateContext}
      />
      </div>
      <IndeterminateCheckBoxIcon
        className="text-red-500 cursor-pointer self-center rounded-md m-6 text-4xl hover:text-red-600 hover:scale-110 active:text-red-700 active:scale-90 transition-transform duration-100"
        onClick={deleteSelf}
      />
    </div>
  );
}