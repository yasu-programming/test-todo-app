import { Todo } from '@/types/todo';

// Simple in-memory data store for demo purposes
// In a real application, this would be replaced with a database
class TodoStore {
  private todos: Todo[] = [];
  private nextId = 1;

  generateId(): string {
    return (this.nextId++).toString();
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  getById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(title: string, description?: string): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: this.generateId(),
      title,
      description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    const updatedTodo = {
      ...this.todos[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  deleteAll(): void {
    this.todos = [];
    this.nextId = 1;
  }
}

// Export a singleton instance
export const todoStore = new TodoStore();

// Add some sample data for demo
todoStore.create('Learn Next.js', 'Master the basics of Next.js framework');
todoStore.create('Build a Todo App', 'Create a full-featured todo application');
todoStore.create('Deploy to Production', 'Deploy the app to a production environment');