import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from '../components/UserTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUsers, deleteUser, clearLocalData } from '../services/userService';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      setTimeout(() => setSuccess(''), 4000);
    }
  }, [location.state]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const userData = await getUsers();
      setUsers(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        await fetchUsers();
        setSuccess('User deleted successfully! 🗑️');
        setTimeout(() => setSuccess(''), 4000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleView = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-2xl shadow-blue-500/25 animate-pulse">
          <span className="text-3xl">👥</span>
        </div>
        <h1 className="text-5xl font-bold gradient-text mb-4">
          Team Management
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Streamline your team operations with our powerful user management system. 
          Create, organize, and manage user profiles with style and efficiency.
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-center mt-8 space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">{users.length}</div>
            <div className="text-sm text-muted">Active Users</div>
          </div>
          <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">100%</div>
            <div className="text-sm text-muted">Uptime</div>
          </div>
          <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-muted">Scalability</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Directory</h2>
              <p className="text-muted">Manage and organize your team members</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                clearLocalData();
                window.location.reload();
              }}
              className="btn btn-secondary btn-md"
            >
              <span className="mr-2">🔄</span>
              Reset
            </button>
            <button
              onClick={() => navigate('/create')}
              className="btn btn-primary btn-md"
            >
              <span className="mr-2">✨</span>
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert-error">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-semibold">Something went wrong</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="alert-success">
          <div className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <h3 className="font-semibold">Success!</h3>
              <p>{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {users.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center dark:from-gray-800 dark:to-gray-700">
            <span className="text-4xl">🚀</span>
          </div>
          <h3 className="text-3xl font-bold mb-4 gradient-text">Ready to get started?</h3>
          <p className="text-xl text-muted mb-8 max-w-md mx-auto">
            Your team directory is empty. Add your first team member to begin building your organization.
          </p>
          <button
            onClick={() => navigate('/create')}
            className="btn btn-primary btn-md text-lg px-8"
          >
            <span className="mr-2">🎯</span>
            Create First User
          </button>
        </div>
      ) : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/create')}
        className="floating-action"
        title="Add New User"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Home;