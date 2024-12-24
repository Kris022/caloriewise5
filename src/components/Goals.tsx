import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Goals.module.css";

const Goals = () => {
  const navigate = useNavigate();
  const [calories, setCalories] = useState(2000);
  const [macros, setMacros] = useState({
    protein: 30,
    carbs: 40,
    fats: 30,
  });

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCalories(value);
  };

  const handleMacroChange = (macro: keyof typeof macros, value: number) => {
    const newMacros = { ...macros, [macro]: value };
    const total = Object.values(newMacros).reduce((sum, val) => sum + val, 0);
    
    // Adjust other macros proportionally if total exceeds 100
    if (total > 100) {
      const otherMacros = Object.entries(newMacros)
        .filter(([key]) => key !== macro)
        .map(([key]) => key as keyof typeof macros);
      
      const excess = total - 100;
      const reduction = excess / otherMacros.length;
      
      otherMacros.forEach(key => {
        newMacros[key] = Math.max(0, newMacros[key] - reduction);
      });
    }

    setMacros(newMacros);
  };

  const calculateGrams = (percentage: number) => {
    const totalCalories = calories;
    switch (true) {
      case percentage === macros.protein:
        return Math.round((totalCalories * (percentage / 100)) / 4); // Protein: 4 calories per gram
      case percentage === macros.carbs:
        return Math.round((totalCalories * (percentage / 100)) / 4); // Carbs: 4 calories per gram
      case percentage === macros.fats:
        return Math.round((totalCalories * (percentage / 100)) / 9); // Fats: 9 calories per gram
      default:
        return 0;
    }
  };

  return (
    <div className={styles.goalsContainer}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/settings")}>
          <IoArrowBack />
        </button>
      </header>

      <section className={styles.section}>
        <h2>Daily Calories</h2>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={calories}
            onChange={handleCaloriesChange}
            min="0"
            step="50"
          />
          <span>kcal</span>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Macronutrients</h2>
        <div className={styles.macroSlider}>
          <label>Protein</label>
          <div className={styles.sliderGroup}>
            <input
              type="range"
              min="0"
              max="100"
              value={macros.protein}
              onChange={(e) => handleMacroChange("protein", parseInt(e.target.value))}
            />
            <div className={styles.macroValues}>
              <span>{macros.protein}%</span>
              <span>{calculateGrams(macros.protein)}g</span>
            </div>
          </div>
        </div>

        <div className={styles.macroSlider}>
          <label>Carbs</label>
          <div className={styles.sliderGroup}>
            <input
              type="range"
              min="0"
              max="100"
              value={macros.carbs}
              onChange={(e) => handleMacroChange("carbs", parseInt(e.target.value))}
            />
            <div className={styles.macroValues}>
              <span>{macros.carbs}%</span>
              <span>{calculateGrams(macros.carbs)}g</span>
            </div>
          </div>
        </div>

        <div className={styles.macroSlider}>
          <label>Fats</label>
          <div className={styles.sliderGroup}>
            <input
              type="range"
              min="0"
              max="100"
              value={macros.fats}
              onChange={(e) => handleMacroChange("fats", parseInt(e.target.value))}
            />
            <div className={styles.macroValues}>
              <span>{macros.fats}%</span>
              <span>{calculateGrams(macros.fats)}g</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Macro Distribution</h2>
        <div className={styles.macroDistribution}>
          <div
            className={styles.macroBar}
            style={{
              background: `linear-gradient(
                to right,
                #EF4444 0%,
                #EF4444 ${macros.protein}%,
                #3B82F6 ${macros.protein}%,
                #3B82F6 ${macros.protein + macros.carbs}%,
                #10B981 ${macros.protein + macros.carbs}%,
                #10B981 100%
              )`,
            }}
          />
          <div className={styles.macroLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: "#EF4444" }} />
              <span>Protein</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: "#3B82F6" }} />
              <span>Carbs</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: "#10B981" }} />
              <span>Fats</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Goals;
