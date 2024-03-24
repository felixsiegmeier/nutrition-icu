// createSliderConfig.js
export function createSliderConfig(nutrition, handleChange) {
    return [
      {
        label: "Energie",
        max: 300,
        min: 0,
        value: nutrition.energy * 100,
        unit: "kcal/ml",
        onChange: (value) => handleChange("energy", .01, value),
        factor: .01
      },
      {
        label: "Kohlenhydrate",
        max: 3500,
        min: 0,
        value: nutrition.carbs * 100,
        unit: "g/100ml",
        onChange: (value) => handleChange("carbs", .01, value),
        factor: .01
      },
      {
        label: "Eiweiß",
        max: 1500,
        min: 0,
        value: nutrition.protein * 100,
        unit: "g/100ml",
        onChange: (value) => handleChange("protein", .01, value),
        factor: .01
      },
      {
        label: "Fette",
        max: 1500,
        min: 0,
        value: nutrition.fat * 100,
        unit: "g/100ml",
        onChange: (value) => handleChange("fat", .01, value),
        factor: .01
      },
    ];
  }
  