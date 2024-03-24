"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import NutritionCard from "./NutritionCard";
import NutritionSum from "../NutritionSum/NutritionSum";
import { useAppContext } from "@/app/Context/AppContextProvider";

export default function Nutrition() {
  const [cardCount, setCardCount] = useState(0);
  const [cards, setCards] = useState([]);
  const { allNutrition, setAllNutritions } = useAppContext();

  function addCard() {
    const newCard = cardCount + 1;
    setCards([...cards, newCard]);
    setCardCount(newCard);
    setAllNutritions([
      ...allNutrition,
      {
        id: newCard,
        energy: 1.07,
        carbs: 11,
        protein: 5.69,
        fat: 4,
        application: false,
        portionSize: 1,
        amount: 0
      },
    ]);
  }

  function deleteCard(card) {
    setCards((prev) => prev.filter((c) => c !== card));
    setAllNutritions((prev) => prev.filter((c) => c.id !== card));
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {cards.map((card) => (
        <NutritionCard
          key={card}
          id={card}
          deleteSelf={() => deleteCard(card)}
        />
      ))}
      <AddBoxIcon
        className="text-green-500 cursor-pointer self-center rounded-md text-6xl hover:text-green-600 hover:scale-110 active:text-green-700 active:scale-90 transition-transform duration-100"
        onClick={addCard}
      />
    </div>
  );
}
