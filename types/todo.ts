export type TodoStatus = 'completed' | 'pending';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
}
