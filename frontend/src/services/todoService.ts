import axios from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const response = await api.get<Todo[]>('/todos');
    return response.data.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
    }));
  },

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const response = await api.post<Todo>('/todos', input);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  },

  async updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
    const response = await api.put<Todo>(`/todos/${id}`, input);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  },

  async deleteTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },

  async toggleTodo(id: number): Promise<Todo> {
    // First get the current todo to know its current state
    const currentTodo = await this.getTodoById(id);
    const response = await api.put<Todo>(`/todos/${id}`, {
      completed: !currentTodo.completed,
    });
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await api.get<Todo>(`/todos/${id}`);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  },
};