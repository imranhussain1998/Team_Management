import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUser } from '../services/userService';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError('');
      const userData = await getUser(id);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Details</h1>
          <p className="text-muted mt-1">View user information</p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/50 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary btn-md">
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Not Found</h1>
          <p className="text-muted mt-1">The user you're looking for doesn't exist</p>
        </div>
        <button onClick={() => navigate('/')} className="btn btn-primary btn-md">
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Details</h1>
          <p className="text-muted mt-1">View information for {user.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(`/edit/${user.id}`, { state: { user } })}
            className="btn btn-secondary btn-md"
          >
            Edit User
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary btn-md"
          >
            Back to Users
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Personal Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">@{user.username}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user.phone}</dd>
              </div>
              {user.website && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                  <dd className="mt-1">
                    <a 
                      href={`http://${user.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {user.website}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            {user.address && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Address</h3>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                </div>
              </div>
            )}
            
            {user.company && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Company</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100">{user.company.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Catchphrase</dt>
                    <dd className="text-sm text-gray-900 dark:text-gray-100 italic">"{user.company.catchPhrase}"</dd>
                  </div>
                  {user.company.bs && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Business</dt>
                      <dd className="text-sm text-gray-900 dark:text-gray-100">{user.company.bs}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;