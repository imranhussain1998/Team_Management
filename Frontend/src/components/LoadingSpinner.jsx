const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-transparent border-t-blue-600 border-r-indigo-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
      </div>
      <h3 className="text-xl font-semibold gradient-text mb-2">Loading...</h3>
      <p className="text-muted">Please wait while we fetch your data</p>
      <div className="flex justify-center space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;