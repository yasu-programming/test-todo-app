'use client';

import { Todo, UpdateTodoRequest } from '@/types/todo';
import TodoItem from './TodoItem';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: UpdateTodoRequest) => Promise<void | Todo>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string) => Promise<void | Todo>;
  isLoading?: boolean;
}

export default function TodoList({ 
  todos, 
  onUpdate, 
  onDelete, 
  onToggle, 
  isLoading = false 
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No todos yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating your first todo above.
        </p>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{todos.length}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{incompleteTodos.length}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedTodos.length}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>
      </div>

      {/* Active Todos */}
      {incompleteTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Active Todos ({incompleteTodos.length})
          </h2>
          <div className="space-y-3">
            {incompleteTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggle={onToggle}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Completed Todos ({completedTodos.length})
          </h2>
          <div className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggle={onToggle}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}