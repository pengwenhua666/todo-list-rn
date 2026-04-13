import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/todo';

const TODOS_KEY = 'todos_data';

export const storage = {
  async loadTodos(): Promise<Todo[]> {
    try {
      const data = await AsyncStorage.getItem(TODOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  },

  async removeTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_KEY);
    } catch (error) {
      console.error('Error removing todos:', error);
    }
  },
};
