'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { LoadingState } from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const {
    todos,
    total,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
    toggleTodo,
    refresh,
  } = useTodos();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorState 
            message="Failed to load todos. Please check your connection and try again."
            onRetry={refresh}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo App
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with this modern todo application
          </p>
        </div>

        {/* Todo Form */}
        <div className="mb-8">
          <TodoForm onSubmit={createTodo} isLoading={isLoading} />
        </div>

        {/* Actions */}
        {total > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {total} {total === 1 ? 'todo' : 'todos'} total
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all todos?')) {
                  deleteAllTodos();
                }
              }}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              disabled={isLoading}
            >
              <TrashIcon className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Content */}
        {isLoading && todos.length === 0 ? (
          <LoadingState message="Loading your todos..." />
        ) : (
          <TodoList
            todos={todos}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
