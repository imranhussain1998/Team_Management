import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { updateUser, getUser } from '../services/userService';

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [id, location.state]);

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

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await updateUser(id, { ...formData, id: parseInt(id) });
      navigate('/', { state: { success: 'User updated successfully' } });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/');

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Edit User</h1>
          <p className="text-muted mt-1">Update user information</p>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Edit User</h1>
        <p className="text-muted mt-1">Update information for {user?.name}</p>
      </div>
      
      <UserForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} isEditing={true} />
    </div>
  );
};

export default EditUser;