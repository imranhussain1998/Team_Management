import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { createUser } from '../services/userService';

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createUser(formData);
      navigate('/', { state: { success: 'User created successfully' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/');

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add User</h1>
        <p className="text-muted mt-1">Create a new user account</p>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/50 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} isEditing={false} />
    </div>
  );
};

export default CreateUser;