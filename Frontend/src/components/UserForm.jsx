import { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card overflow-hidden">
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
          </div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 border border-white/30">
              <span className="text-4xl">{isEditing ? '✏️' : '✨'}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {isEditing ? 'Edit User Profile' : 'Create New User'}
            </h2>
            <p className="text-white/80 text-lg">
              {isEditing ? 'Update user information below' : 'Fill in the details to add a new team member'}
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📧</span>
                  </div>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  className="input"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🌐</span>
                  </div>
                  Website <span className="text-muted font-normal ml-1">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  id="website" 
                  name="website" 
                  value={formData.website} 
                  onChange={handleChange} 
                  className="input"
                  placeholder="Enter website URL"
                />
              </div>
            </div>
            
            <div className="flex gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button 
                type="button" 
                className="flex-1 btn btn-secondary btn-md" 
                onClick={onCancel}
              >
                <span className="mr-2">❌</span>
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 btn btn-primary btn-md"
              >
                <span className="mr-2">{isEditing ? '✅' : '🚀'}</span>
                {isEditing ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;