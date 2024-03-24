// createSliderConfig.js
export function createSliderConfig(demand, handleChange) {
    return [
      {
        label: "Energie",
        max: 50,
        min: 0,
        value: demand.energy,
        unit: "kcal/kg",
        onChange: (value) => handleChange("energy", 1, value),
        factor: 1
      },
      {
        label: "Kohlenhydrate",
        max: 50,
        min: 10,
        value: demand.carbs * 10,
        unit: "g/kg",
        onChange: (value) => handleChange("carbs", .1, value),
        factor: .1
      },
      {
        label: "Eiweiß",
        max: 25,
        min: 5,
        value: demand.protein * 10,
        unit: "g/kg",
        onChange: (value) => handleChange("protein", .1, value),
        factor: .1
      },
      {
        label: "Fette",
        max: 20,
        min: 5,
        value: demand.fat * 10,
        unit: "g/kg",
        onChange: (value) => handleChange("fat", .1, value),
        factor: .1
      },
    ];
  }
  