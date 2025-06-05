'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CreateTodoRequest, Todo } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoFormProps {
  onSubmit: (data: CreateTodoRequest) => Promise<void | Todo>;
  isLoading?: boolean;
}

export default function TodoForm({ onSubmit, isLoading = false }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!title.trim() || isLoading}
            className={cn(
              "px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base",
              "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "w-full sm:w-auto"
            )}
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>{isLoading ? 'Adding...' : 'Add'}</span>
          </button>
        </div>
        
        {isExpanded && (
          <div className="space-y-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setDescription('');
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}