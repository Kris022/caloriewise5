import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddFood.module.css";
import { IoCamera, IoImage, IoAdd, IoCheckmark } from "react-icons/io5";
import { useFood, NewFoodEntry } from "../context/FoodContext";

const AddFood = () => {
  const navigate = useNavigate();
  const { addFood, updateFood, selectedFood, selectFood } = useFood();
  const [foodData, setFoodData] = useState<NewFoodEntry>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    servingSize: 100,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedFood) {
      const { id, date, ...foodWithoutIdAndDate } = selectedFood;
      setFoodData(foodWithoutIdAndDate);
    }
    // Cleanup function to clear selected food when component unmounts
    return () => selectFood(null);
  }, [selectedFood, selectFood]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof NewFoodEntry
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFoodData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTakePhoto = () => {
    // TODO: Implement camera functionality
    console.log("Take photo");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Handle image upload
      console.log("File selected:", file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedFood) {
        await updateFood(selectedFood.id, foodData);
      } else {
        await addFood(foodData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving food:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageOptions}>
        <button className={styles.imageButton} onClick={handleTakePhoto}>
          <IoCamera />
          <span>Take Photo</span>
        </button>
        <button className={styles.imageButton} onClick={handleUploadClick}>
          <IoImage />
          <span>Upload Image</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className={styles.fileInput}
          />
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            value={foodData.name}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="servingSize">Serving Size (g)</label>
          <input
            type="number"
            id="servingSize"
            value={foodData.servingSize}
            onChange={(e) => handleInputChange(e, "servingSize")}
            min="0"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            id="calories"
            value={foodData.calories}
            onChange={(e) => handleInputChange(e, "calories")}
            min="0"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="protein">Protein (g)</label>
          <input
            type="number"
            id="protein"
            value={foodData.protein}
            onChange={(e) => handleInputChange(e, "protein")}
            min="0"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="carbs">Carbs (g)</label>
          <input
            type="number"
            id="carbs"
            value={foodData.carbs}
            onChange={(e) => handleInputChange(e, "carbs")}
            min="0"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="fats">Fats (g)</label>
          <input
            type="number"
            id="fats"
            value={foodData.fats}
            onChange={(e) => handleInputChange(e, "fats")}
            min="0"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {selectedFood ? <IoCheckmark /> : <IoAdd />}
          {selectedFood ? "Update Food" : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
