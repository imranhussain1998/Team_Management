const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const STORAGE_KEY = 'userManagementData';

// Get data from localStorage or initialize with API data
const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Save data to localStorage
const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Initialize data from API if not in localStorage
const initializeData = async () => {
  const stored = getStoredData();
  if (stored) return stored;
  
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch initial data');
    const apiData = await response.json();
    saveToStorage({ users: apiData, nextId: 11 });
    return { users: apiData, nextId: 11 };
  } catch (error) {
    throw new Error('Failed to initialize data');
  }
};

export const getUsers = async () => {
  try {
    const data = await initializeData();
    return data.users;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};

export const getUser = async (id) => {
  try {
    const data = await initializeData();
    const user = data.users.find(u => u.id === parseInt(id));
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user');
  }
};

export const createUser = async (userData) => {
  try {
    const data = await initializeData();
    const newUser = {
      ...userData,
      id: data.nextId,
      username: userData.name.toLowerCase().replace(/\s+/g, '')
    };
    
    data.users.push(newUser);
    data.nextId += 1;
    saveToStorage(data);
    
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Failed to create user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const data = await initializeData();
    const userIndex = data.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) throw new Error('User not found');
    
    data.users[userIndex] = { ...data.users[userIndex], ...userData };
    saveToStorage(data);
    
    return data.users[userIndex];
  } catch (error) {
    throw new Error(error.message || 'Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const data = await initializeData();
    const userIndex = data.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) throw new Error('User not found');
    
    data.users.splice(userIndex, 1);
    saveToStorage(data);
    
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete user');
  }
};

// Clear all local data (for testing)
export const clearLocalData = () => {
  localStorage.removeItem(STORAGE_KEY);
};