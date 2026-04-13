// 定义任务状态类型：已完成或待处理
export type TodoStatus = 'completed' | 'pending';

// 定义任务接口
export interface Todo {
  id: string; // 唯一标识符
  title: string; // 任务标题
  description?: string; // 任务描述（可选）
  status: TodoStatus; // 任务状态
}
