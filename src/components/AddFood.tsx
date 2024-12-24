import { useState, useRef } from "react";
import styles from "./AddFood.module.css";
import { IoCamera, IoImage, IoAdd } from "react-icons/io5";

interface FoodData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: number;
}

const AddFood = () => {
  const [foodData, setFoodData] = useState<FoodData>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    servingSize: 100,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FoodData
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Submit food data:", foodData);
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
          <IoAdd />
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
