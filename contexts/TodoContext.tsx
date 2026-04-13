import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { storage } from '../utils/storage';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string, description?: string) => void;
  deleteTodo: (id: string) => void;
  deleteBatch: (ids: string[]) => void;
  updateTodoStatus: (id: string, status: 'completed' | 'pending') => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  loadTodos: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    initializeTodos();
  }, []);

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

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  const deleteBatch = (ids: string[]) => {
    const updatedTodos = todos.filter((todo) => !ids.includes(todo.id));
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

  const updateTodoStatus = (id: string, status: 'completed' | 'pending') => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
    storage.saveTodos(updatedTodos);
  };

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

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
