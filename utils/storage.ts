// 导入AsyncStorage用于本地存储
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/todo';

// 定义存储键
const TODOS_KEY = 'todos_data';

// 存储工具对象
export const storage = {
  // 加载所有任务
  async loadTodos(): Promise<Todo[]> {
    try {
      const data = await AsyncStorage.getItem(TODOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  // 保存所有任务
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  },

  // 删除所有任务
  async removeTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_KEY);
    } catch (error) {
      console.error('Error removing todos:', error);
    }
  },
};
