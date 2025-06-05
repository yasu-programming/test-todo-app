import useSWR from 'swr';
import { todoApi } from '@/lib/api';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

export function useTodos() {
  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR('/todos', todoApi.getAll, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const createTodo = async (todoData: CreateTodoRequest): Promise<Todo> => {
    const newTodo = await todoApi.create(todoData);
    
    // Optimistically update the cache
    if (data) {
      mutate({
        todos: [...data.todos, newTodo],
        total: data.total + 1,
      }, false);
    }
    
    // Revalidate to ensure consistency
    mutate();
    return newTodo;
  };

  const updateTodo = async (id: string, updates: UpdateTodoRequest): Promise<Todo> => {
    const updatedTodo = await todoApi.update(id, updates);
    
    // Optimistically update the cache
    if (data) {
      const updatedTodos = data.todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      );
      mutate({
        todos: updatedTodos,
        total: data.total,
      }, false);
    }
    
    // Revalidate to ensure consistency
    mutate();
    return updatedTodo;
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await todoApi.delete(id);
    
    // Optimistically update the cache
    if (data) {
      const filteredTodos = data.todos.filter(todo => todo.id !== id);
      mutate({
        todos: filteredTodos,
        total: data.total - 1,
      }, false);
    }
    
    // Revalidate to ensure consistency
    mutate();
  };

  const deleteAllTodos = async (): Promise<void> => {
    await todoApi.deleteAll();
    
    // Optimistically update the cache
    mutate({
      todos: [],
      total: 0,
    }, false);
    
    // Revalidate to ensure consistency
    mutate();
  };

  const toggleTodo = async (id: string): Promise<Todo> => {
    const todo = data?.todos.find(t => t.id === id);
    if (!todo) throw new Error('Todo not found');
    
    return updateTodo(id, { completed: !todo.completed });
  };

  return {
    todos: data?.todos || [],
    total: data?.total || 0,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
    toggleTodo,
    refresh: mutate,
  };
}