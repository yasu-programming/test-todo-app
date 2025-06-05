'use client';

import { TodoFilters } from '@/types/todo';

interface TodoFiltersProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export default function TodoFiltersComponent({ 
  filters, 
  onFiltersChange, 
  totalCount, 
  activeCount, 
  completedCount 
}: TodoFiltersProps) {
  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    onFiltersChange({ ...filters, status });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search: search || undefined });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
      {/* Search */}
      <div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Search todos..."
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleStatusChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filters.status === 'all' || !filters.status
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          onClick={() => handleStatusChange('active')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filters.status === 'active'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => handleStatusChange('completed')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filters.status === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>
    </div>
  );
}