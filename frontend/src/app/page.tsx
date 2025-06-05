'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoFilters } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoFiltersComponent from '@/components/TodoFilters';

export default function Home() {
  const { todos, isLoading, error, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [filters, setFilters] = useState<TodoFilters>({ status: 'all' });

  const handleUpdateTodo = async (id: number, updates: { title?: string; description?: string }) => {
    await updateTodo(id, updates);
  };

  const totalCount = todos.length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-red-800 dark:text-red-200 font-medium">Error loading todos</h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-1 text-sm">
              {error.message || 'Something went wrong. Please try refreshing the page.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Todo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-blue-700 dark:text-blue-300">Loading todos...</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Add Todo Form */}
          <TodoForm onSubmit={createTodo} />

          {/* Filters */}
          {!isLoading && (
            <TodoFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={totalCount}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          )}

          {/* Todo List */}
          {!isLoading && (
            <TodoList
              todos={todos}
              filters={filters}
              onUpdateTodo={handleUpdateTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
