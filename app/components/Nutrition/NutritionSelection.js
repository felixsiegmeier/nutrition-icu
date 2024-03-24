export default function NutritionSelection({nutritionData, selection, handleSelectionChange}) {
    return (
        <select value={selection} onChange={handleSelectionChange} className="border mb-6 rounded-md text-black p-1 cursor-pointer outline-none">
        <option value="Benutzerdefiniert">Benutzerdefiniert</option>
        <optgroup label="Drinks etc.">
          {Object.keys(nutritionData)
            .sort()
            .map((nutrition, index) => {
              if (nutritionData[nutrition].application !== "oral-portion")
                return;
              return (
                <option className="" key={index} value={nutrition}>
                  {nutrition}
                </option>
              );
            })}
        </optgroup>
        <optgroup label="Sondennahrung">
          {Object.keys(nutritionData)
            .sort()
            .map((nutrition, index) => {
              if (nutritionData[nutrition].application !== "tube") return;
              return (
                <option key={index} value={nutrition}>
                  {nutrition}
                </option>
              );
            })}
        </optgroup>
        <optgroup label="Parenteral">
          {Object.keys(nutritionData)
            .sort()
            .map((nutrition, index) => {
              if (nutritionData[nutrition].application !== "iv") return;
              return (
                <option key={index} value={nutrition}>
                  {nutrition}
                </option>
              );
            })}
        </optgroup>
      </select>
    )
}