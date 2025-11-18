# User Management Application

A React-based CRUD application for managing users using the JSONPlaceholder API.

## Features

- **View Users**: Display all users in a responsive table format
- **Create User**: Add new users with a form
- **Edit User**: Update existing user information
- **Delete User**: Remove users with confirmation
- **User Details**: View detailed information for each user
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Shows spinners during API calls
- **Error Handling**: Proper error messages for failed operations

## Technologies Used

- React 18 with Hooks (useState, useEffect)
- React Router DOM for navigation
- JSONPlaceholder API for backend simulation
- CSS3 with responsive design
- Fetch API for HTTP requests

## Installation

1. Navigate to the project directory:
   ```bash
   cd User_Management_Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── LoadingSpinner.js    # Reusable loading component
│   ├── UserForm.js          # Form for create/edit operations
│   └── UserTable.js         # Table to display users
├── pages/
│   ├── Home.js              # Main page with user list
│   ├── CreateUser.js        # Create new user page
│   ├── EditUser.js          # Edit existing user page
│   └── UserDetail.js        # User detail view page
├── services/
│   └── userService.js       # API service functions
├── App.js                   # Main app component with routing
├── index.js                 # App entry point
└── index.css                # Global styles
```

## API Operations

The application performs the following operations with JSONPlaceholder API:

- **GET /users** - Fetch all users
- **GET /users/:id** - Fetch single user
- **POST /users** - Create new user (simulated)
- **PUT /users/:id** - Update user (simulated)
- **DELETE /users/:id** - Delete user (simulated)

## Usage

1. **Home Page**: View all users in a table with options to view, edit, or delete
2. **Add User**: Click "Add New User" to create a new user
3. **Edit User**: Click "Edit" button next to any user to modify their information
4. **View Details**: Click "View" button to see complete user information
5. **Delete User**: Click "Delete" button and confirm to remove a user

## Notes

- The JSONPlaceholder API simulates CRUD operations but doesn't persist changes
- All form validations are implemented on the frontend
- The application is fully responsive and works on mobile devices
- Loading spinners provide visual feedback during API calls
- Error messages are displayed for failed operations