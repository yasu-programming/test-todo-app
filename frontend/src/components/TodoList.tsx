'use client';

import { Todo, TodoFilters } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filters: TodoFilters;
  onUpdateTodo: (id: number, updates: { title?: string; description?: string }) => Promise<void>;
  onToggleTodo: (id: number) => Promise<void | Todo>;
  onDeleteTodo: (id: number) => Promise<void>;
}

export default function TodoList({ 
  todos, 
  filters, 
  onUpdateTodo, 
  onToggleTodo, 
  onDeleteTodo 
}: TodoListProps) {
  // Filter todos based on current filters
  const filteredTodos = todos.filter(todo => {
    // Filter by status
    if (filters.status === 'active' && todo.completed) return false;
    if (filters.status === 'completed' && !todo.completed) return false;
    
    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Sort todos: incomplete first, then by creation date (newest first)
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400">
          {todos.length === 0 ? (
            <>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-lg font-medium">No todos yet</p>
              <p className="text-sm">Add your first todo to get started!</p>
            </>
          ) : (
            <>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-medium">No todos match your filters</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}