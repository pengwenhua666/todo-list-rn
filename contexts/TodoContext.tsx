// 导入React相关hooks和组件
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { storage } from '../utils/storage';

// 定义Todo上下文类型接口
interface TodoContextType {
  todos: Todo[]; // 任务列表
  loading: boolean; // 加载状态
  error: string | null; // 错误信息
  addTodo: (title: string, description?: string) => void; // 添加任务
  deleteTodo: (id: string) => void; // 删除单个任务
  deleteBatch: (ids: string[]) => void; // 批量删除任务
  updateTodoStatus: (id: string, status: 'completed' | 'pending') => void; // 更新任务状态
  updateTodo: (id: string, updates: Partial<Todo>) => void; // 更新任务信息
  loadTodos: () => Promise<void>; // 重新加载任务
}

// 创建Todo上下文
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Todo提供者组件，管理全局状态
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]); // 任务状态
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误状态

  // 组件挂载时初始化任务数据
  useEffect(() => {
    initializeTodos();
  }, []);

  // 初始化任务数据
  const initializeTodos = async () => {
    try {
      setLoading(true);
      const loadedTodos = await storage.loadTodos();
      setTodos(loadedTodos);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  // 重新加载任务数据
  const loadTodos = async () => {
    try {
      setLoading(true);
      const loadedTodos = await storage.loadTodos();
      setTodos(loadedTodos);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  // 添加新任务
  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description: description || '',
      status: 'pending',
    };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  // 删除单个任务
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  // 批量删除任务
  const deleteBatch = (ids: string[]) => {
    const updatedTodos = todos.filter((todo) => !ids.includes(todo.id));
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  // 更新任务状态
  const updateTodoStatus = (id: string, status: 'completed' | 'pending') => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  // 更新任务信息
  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        addTodo,
        deleteTodo,
        deleteBatch,
        updateTodoStatus,
        updateTodo,
        loadTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// 使用Todo上下文的hook
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
