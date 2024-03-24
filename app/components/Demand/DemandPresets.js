import { useEffect, useState } from "react"
import CustomPopover from "../CustomPopover";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAppContext } from "@/app/Context/AppContextProvider";
import { demandInfo } from "./demandInfo";

export default function DemandPresets() {
    const [presetData, setPresetData] = useState({});
    const [chosenData, setChosenData] = useState(0);
    const [anchor, setAnchor] = useState(null);
    const [ignoreNextDemandChange, setIgnoreNextDemandChange] = useState(false);
    const { demand, setDemand, linkDemand, setLinkDemand } = useAppContext();

    useEffect(() => {
        async function fetchData(){
            const res = await fetch("/api/demandPresets");
            const data = await res.json();
            setPresetData(data);
        }
        fetchData();
    },[] )

    useEffect(() => {
        if(ignoreNextDemandChange) return;
        if(!chosenData || chosenData === 0) return;
        if(demand.energy === presetData[chosenData].energy && demand.carbs === presetData[chosenData].carbs && demand.protein === presetData[chosenData].protein && demand.fat === presetData[chosenData].fat) return;
        setChosenData(0)
    }, [demand, linkDemand])

    const handleChange = (e) => {
        const setting = e.target.value
        setChosenData(setting)
        if(!setting || setting === 0) return;
        setDemand({...presetData[setting]})
        setLinkDemand(false)
        setIgnoreNextDemandChange(true)
        setTimeout(() => setIgnoreNextDemandChange(false), 500)
    }

    return (
        <div className="flex flex-row gap-5 items-center">
                <p className="w-20 ">Vorlage:</p>
                <select
                    value={chosenData}
                    onChange={handleChange}
                    className="border rounded-md text-black p-1 cursor-pointer outline-none"
                >
                <option value={0} >Benutzerdefiniert</option>
                {Object.keys(presetData).map((setting, index) => <option key={index} value={setting} >{setting}</option>)}
                </select>
                {/* Hilfe-Icon mit Popover für zusätzliche Informationen */}
                <HelpOutlineIcon onMouseEnter={(e) => setAnchor(e.currentTarget)} onMouseLeave={() => setAnchor(null)} />
                <CustomPopover content={demandInfo} anchor={anchor} setAnchor={setAnchor} />
            </div>
    )
}