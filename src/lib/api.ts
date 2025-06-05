import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest, TodoListResponse } from '@/types/todo';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getAll: async (): Promise<TodoListResponse> => {
    const response = await api.get<TodoListResponse>('/todos');
    return response.data;
  },

  // Get a single todo by id
  getById: async (id: string): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  create: async (data: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', data);
    return response.data;
  },

  // Update a todo
  update: async (id: string, data: UpdateTodoRequest): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  // Delete a todo
  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  // Delete all todos
  deleteAll: async (): Promise<void> => {
    await api.delete('/todos');
  },
};

export default api;