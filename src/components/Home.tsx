import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { IoCalendarOutline, IoTrashOutline } from "react-icons/io5";
import { useFood } from "../context/FoodContext";

interface MacroProgress {
  current: number;
  goal: number;
}

const Home = () => {
  const navigate = useNavigate();
  const { 
    foods, 
    deleteFood, 
    selectFood, 
    selectedDate, 
    setSelectedDate,
    isLoading 
  } = useFood();

  const [macros] = useState<Record<string, MacroProgress>>({
    calories: { current: 1200, goal: 2000 },
    protein: { current: 60, goal: 150 },
    carbs: { current: 120, goal: 250 },
    fats: { current: 40, goal: 70 },
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric' 
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressBarColor = (nutrient: string) => {
    switch (nutrient) {
      case 'calories':
        return '#3B82F6';
      case 'protein':
        return '#EF4444';
      case 'carbs':
        return '#10B981';
      case 'fats':
        return '#F59E0B';
      default:
        return '#3B82F6';
    }
  };

  const handleFoodClick = (food: typeof foods[0]) => {
    selectFood(food);
    navigate('/add');
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateHeader}>
        <h2>{formatDate(selectedDate)}</h2>
        <button className={styles.calendarButton}>
          <IoCalendarOutline />
          <input 
            type="date" 
            onChange={handleDateChange}
            value={selectedDate.toISOString().split('T')[0]}
            className={styles.dateInput}
          />
        </button>
      </div>

      <section className={styles.macroProgress}>
        {Object.entries(macros).map(([nutrient, { current, goal }]) => (
          <div key={nutrient} className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.nutrientName}>{nutrient}</span>
              <span className={styles.progressValues}>
                {current}/{goal}{nutrient === 'calories' ? 'kcal' : 'g'}
              </span>
            </div>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${calculateProgress(current, goal)}%`,
                  backgroundColor: getProgressBarColor(nutrient),
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className={styles.foodList}>
        <h2>Today's Foods</h2>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : foods.length === 0 ? (
          <div className={styles.emptyState}>No foods added yet</div>
        ) : (
          foods.map((food) => (
            <div key={food.id} className={styles.foodItem} onClick={() => handleFoodClick(food)}>
              <div className={styles.foodMain}>
                <h3>{food.name}</h3>
                <div className={styles.foodActions}>
                  <span className={styles.calories}>{food.calories}kcal</span>
                  <button 
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFood(food.id);
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
              <div className={styles.macroValues}>
                <span>P: {food.protein}g</span>
                <span>C: {food.carbs}g</span>
                <span>F: {food.fats}g</span>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
