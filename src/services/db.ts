import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: number;
  date: Date;
}

export type NewFoodEntry = Omit<FoodEntry, 'id' | 'date'>;
export type UpdateFoodEntry = NewFoodEntry;

interface CaloriesWiseDB extends DBSchema {
  foods: {
    key: string;
    value: FoodEntry;
    indexes: { 'by-date': Date };
  };
}

const DB_NAME = 'calorieswise-db';
const DB_VERSION = 1;

class DatabaseService {
  private db: Promise<IDBPDatabase<CaloriesWiseDB>>;

  constructor() {
    this.db = this.initDB();
  }

  private async initDB() {
    return openDB<CaloriesWiseDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const foodStore = db.createObjectStore('foods', { keyPath: 'id' });
        foodStore.createIndex('by-date', 'date');
      },
    });
  }

  async getAllFoods(): Promise<FoodEntry[]> {
    const db = await this.db;
    return db.getAll('foods');
  }

  async getFoodsByDate(date: Date): Promise<FoodEntry[]> {
    const db = await this.db;
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    const foods = await db.getAllFromIndex('foods', 'by-date');
    return foods.filter(food => {
      const foodDate = new Date(food.date);
      return foodDate >= startOfDay && foodDate <= endOfDay;
    });
  }

  async addFood(food: NewFoodEntry): Promise<FoodEntry> {
    const db = await this.db;
    const newFood: FoodEntry = {
      ...food,
      id: Date.now().toString(),
      date: new Date(),
    };
    await db.add('foods', newFood);
    return newFood;
  }

  async updateFood(id: string, food: UpdateFoodEntry): Promise<FoodEntry> {
    const db = await this.db;
    const existingFood = await db.get('foods', id);
    if (!existingFood) {
      throw new Error('Food not found');
    }
    const updatedFood: FoodEntry = {
      ...food,
      id,
      date: existingFood.date, // Preserve the original date
    };
    await db.put('foods', updatedFood);
    return updatedFood;
  }

  async deleteFood(id: string): Promise<void> {
    const db = await this.db;
    await db.delete('foods', id);
  }
}

export const dbService = new DatabaseService();
