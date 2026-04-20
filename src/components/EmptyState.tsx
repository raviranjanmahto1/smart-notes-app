interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-3">
        <svg
          className="w-8 h-8 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        No notes yet
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-5">
        Create your first note to start organizing your thoughts, ideas, and tasks in one place.
      </p>
      <button 
        onClick={onCreateClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm rounded-md font-medium transition-colors"
      >
        Create your first note
      </button>
    </div>
  );
}
