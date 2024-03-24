import Demand from "./components/Demand/Demand";
import Nutrition from "./components/Nutrition/Nutrition";
import NutritionSum from "./components/NutritionSum/NutritionSum";
import PatientForm from "./components/PatientForm/PatientForm";
import GitHubIcon from "@mui/icons-material/GitHub";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  return (
    <div className="flex flex-col align-middle justify-center items-center select-none">
      <h1 className="text-3xl mt-10">Ernährung in der Intensivmedizin</h1>
      <h2 className="text-2xl mt-10 underline">Patientenparameter</h2>
      <div className="flex flex-row w-full justify-center gap-32">
        <PatientForm />
        <Demand />
      </div>
      <h2 className="text-2xl mt-10 underline">Nahrung hinzufügen</h2>
      <Nutrition />
      <h2 className="text-2xl mt-10 underline">Zusammenfassung</h2>
      <NutritionSum />
      <Tooltip title="Projekt auf Github">
        <div className="fixed bottom-0 right-0 m-5">
          <a
            href="https://github.com/felixsiegmeier/nutrition-icu"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon sx={{ fontSize: 40, color: "white" }} />
          </a>
        </div>
      </Tooltip>
    </div>
  );
}
