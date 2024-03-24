import CustomPopover from "../CustomPopover";

export default function Slider({ label, min, max, value, onChange, unit, factor }) {
  return (
    <div className="flex flex-row gap-5 items-center">
      <p className="w-20">{label}: </p>
      <input
        className="h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ml-8"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="min-w-[80px]">{Math.round(value*factor*10)/10} {unit}</p>
    </div>
  );
}
