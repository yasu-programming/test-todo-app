import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

// Mock data for development
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Learn Next.js App Router',
    description: 'Study the new App Router features in Next.js 13+',
    completed: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Build Todo App',
    description: 'Create a full-featured todo application with TypeScript',
    completed: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    title: 'Setup Tailwind CSS',
    description: 'Configure Tailwind CSS for styling',
    completed: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

// Simple in-memory storage for development
const todos: Todo[] = [...mockTodos];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    await delay(500); // Simulate network delay
    return [...todos];
  },

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    await delay(300);
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    todos.push(newTodo);
    return newTodo;
  },

  async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
    await delay(300);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...input,
      updatedAt: new Date(),
    };
    return todos[todoIndex];
  },

  async deleteTodo(id: string): Promise<void> {
    await delay(300);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    todos.splice(todoIndex, 1);
  },

  async toggleTodo(id: string): Promise<Todo> {
    await delay(300);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    todos[todoIndex] = {
      ...todos[todoIndex],
      completed: !todos[todoIndex].completed,
      updatedAt: new Date(),
    };
    return todos[todoIndex];
  },
};