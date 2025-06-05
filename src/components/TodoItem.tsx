'use client';

import { useState } from 'react';
import { 
  CheckIcon, 
  PencilIcon, 
  TrashIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { Todo, UpdateTodoRequest } from '@/types/todo';
import { cn, formatDate } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: UpdateTodoRequest) => Promise<void | Todo>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string) => Promise<void | Todo>;
  isLoading?: boolean;
}

export default function TodoItem({ 
  todo, 
  onUpdate, 
  onDelete, 
  onToggle, 
  isLoading = false 
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleToggle = async () => {
    try {
      await onToggle(todo.id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add a description (optional)..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              disabled={!editTitle.trim() || isLoading}
              className={cn(
                "px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all",
      todo.completed && "opacity-75"
    )}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
            todo.completed 
              ? "bg-green-500 border-green-500 text-white" 
              : "border-gray-300 hover:border-green-400"
          )}
          disabled={isLoading}
        >
          {todo.completed && <CheckIcon className="h-3 w-3" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-medium text-gray-900",
            todo.completed && "line-through text-gray-500"
          )}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={cn(
              "mt-1 text-gray-600",
              todo.completed && "line-through text-gray-400"
            )}>
              {todo.description}
            </p>
          )}
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Created {formatDate(todo.createdAt)}</span>
            {todo.updatedAt !== todo.createdAt && (
              <span className="ml-2">• Updated {formatDate(todo.updatedAt)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            disabled={isLoading}
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            disabled={isLoading}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}