import useSWR, { mutate } from 'swr';
import { todoService } from '@/services/todoService';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

const TODO_KEY = 'todos';

export function useTodos() {
  const { data: todos = [], error, isLoading } = useSWR<Todo[]>(
    TODO_KEY,
    todoService.getTodos,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const createTodo = async (input: CreateTodoInput) => {
    // Optimistic update
    const tempTodo: Todo = {
      id: Date.now(), // Use number for temp ID
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mutate(
      TODO_KEY,
      [...todos, tempTodo],
      false
    );

    try {
      const newTodo = await todoService.createTodo(input);
      mutate(TODO_KEY);
      return newTodo;
    } catch (error) {
      // Revert optimistic update on error
      mutate(TODO_KEY);
      throw error;
    }
  };

  const updateTodo = async (id: number, input: UpdateTodoInput) => {
    // Optimistic update
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, ...input, updatedAt: new Date() }
        : todo
    );

    mutate(TODO_KEY, updatedTodos, false);

    try {
      const updatedTodo = await todoService.updateTodo(id, input);
      mutate(TODO_KEY);
      return updatedTodo;
    } catch (error) {
      // Revert optimistic update on error
      mutate(TODO_KEY);
      throw error;
    }
  };

  const deleteTodo = async (id: number) => {
    // Optimistic update
    const filteredTodos = todos.filter(todo => todo.id !== id);
    mutate(TODO_KEY, filteredTodos, false);

    try {
      await todoService.deleteTodo(id);
      mutate(TODO_KEY);
    } catch (error) {
      // Revert optimistic update on error
      mutate(TODO_KEY);
      throw error;
    }
  };

  const toggleTodo = async (id: number) => {
    // Optimistic update
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    );

    mutate(TODO_KEY, updatedTodos, false);

    try {
      const updatedTodo = await todoService.toggleTodo(id);
      mutate(TODO_KEY);
      return updatedTodo;
    } catch (error) {
      // Revert optimistic update on error
      mutate(TODO_KEY);
      throw error;
    }
  };

  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refresh: () => mutate(TODO_KEY),
  };
}