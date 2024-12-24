import { createContext, useContext, useState, useEffect } from 'react';
import { dbService, FoodEntry, NewFoodEntry, UpdateFoodEntry } from '../services/db';

interface FoodContextType {
  foods: FoodEntry[];
  selectedFood: FoodEntry | null;
  selectedDate: Date;
  addFood: (food: NewFoodEntry) => Promise<void>;
  updateFood: (id: string, food: UpdateFoodEntry) => Promise<void>;
  deleteFood: (id: string) => Promise<void>;
  selectFood: (food: FoodEntry | null) => void;
  setSelectedDate: (date: Date) => void;
  isLoading: boolean;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Load foods for the selected date
  useEffect(() => {
    const loadFoods = async () => {
      setIsLoading(true);
      try {
        const loadedFoods = await dbService.getFoodsByDate(selectedDate);
        setFoods(loadedFoods);
      } catch (error) {
        console.error('Error loading foods:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFoods();
  }, [selectedDate]);

  const addFood = async (food: NewFoodEntry) => {
    try {
      const newFood = await dbService.addFood(food);
      setFoods(prev => [...prev, newFood]);
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  };

  const updateFood = async (id: string, food: UpdateFoodEntry) => {
    try {
      const updatedFood = await dbService.updateFood(id, food);
      setFoods(prev => prev.map(item => 
        item.id === id ? updatedFood : item
      ));
      setSelectedFood(null);
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await dbService.deleteFood(id);
      setFoods(prev => prev.filter(food => food.id !== id));
      if (selectedFood?.id === id) {
        setSelectedFood(null);
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  };

  const selectFood = (food: FoodEntry | null) => {
    setSelectedFood(food);
  };

  return (
    <FoodContext.Provider 
      value={{ 
        foods, 
        selectedFood, 
        selectedDate,
        addFood, 
        updateFood, 
        deleteFood, 
        selectFood,
        setSelectedDate,
        isLoading
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};

export type { FoodEntry, NewFoodEntry, UpdateFoodEntry };
