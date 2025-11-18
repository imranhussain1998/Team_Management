const UserTable = ({ users, onEdit, onDelete, onView }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {users.map((user, index) => (
      <div 
        key={user.id} 
        className="card card-hover overflow-hidden group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Card Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-white/80 text-sm">@{user.username || 'user'}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                #{user.id}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group/item">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover/item:scale-110 transition-transform">
              <span className="text-white text-sm">📧</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Email</p>
              <p className="font-medium truncate text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group/item">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center group-hover/item:scale-110 transition-transform">
              <span className="text-white text-sm">📞</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Phone</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{user.phone}</p>
            </div>
          </div>

          {user.website && (
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group/item">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                <span className="text-white text-sm">🌐</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Website</p>
                <p className="font-medium text-blue-600 dark:text-blue-400 truncate">{user.website}</p>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4">
          <div className="flex space-x-2">
            <button 
              className="flex-1 btn btn-ghost btn-sm hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/50 dark:hover:text-blue-300" 
              onClick={() => onView(user.id)}
            >
              <span className="mr-1">👁️</span>
              View
            </button>
            <button 
              className="flex-1 btn btn-ghost btn-sm hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-300" 
              onClick={() => onEdit(user)}
            >
              <span className="mr-1">✏️</span>
              Edit
            </button>
            <button 
              className="flex-1 btn btn-ghost btn-sm hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/50 dark:hover:text-red-300" 
              onClick={() => onDelete(user.id)}
            >
              <span className="mr-1">🗑️</span>
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default UserTable;