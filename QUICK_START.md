# Quick Start Guide

## 1. Setup Backend API

Your backend API should provide these endpoints:

### Authentication
```javascript
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, name, email, role, permissions } }

POST /api/auth/register
Body: { name, email, password }
Response: { token, user: { id, name, email, role, permissions } }

GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { user: { id, name, email, role, permissions } }
```

### Users
```javascript
GET /api/users
GET /api/users/:id
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
PATCH /api/users/:id (for role/status updates)
```

### Products
```javascript
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
PATCH /api/products/:id (for status/price updates)
```

### Orders
```javascript
GET /api/orders
GET /api/orders/:id
PATCH /api/orders/:id/status
```

### Dashboard
```javascript
GET /api/dashboard/stats
GET /api/dashboard/revenue
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 5. Login with Test Credentials

Use credentials from your backend:
- Email: admin@example.com
- Password: password123

## 6. Expected User Structure

After login, user object should contain:
```javascript
{
  id: "user_id",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin", // or "manager", "staff", "viewer"
  permissions: [
    "view_dashboard",
    "manage_users",
    "manage_products",
    "manage_orders",
    "view_reports",
    "manage_settings"
  ]
}
```

## 7. Customizing Features

### Add New Menu Item
Edit `src/layout/Sidebar.jsx`:
```javascript
const menuItems = [
  // ... existing items
  {
    label: 'Reports',
    path: '/reports',
    icon: '📈',
    permission: 'view_reports',
  },
];
```

### Add New Page
1. Create page in `src/pages/`
2. Add route in `src/App.jsx`
3. Add menu item in `src/layout/Sidebar.jsx`
4. Wrap with `<ProtectedRoute>` if needed

### Add New Service
Create file in `src/services/`:
```javascript
import api from './api';

export const myService = {
  getAll: (params = {}) => {
    return api.get('/my-endpoint', { params });
  },
  // ... other methods
};
```

### Use Authentication Hook
```javascript
import { useAuth } from '../hooks';

function MyComponent() {
  const { user, hasPermission, login, logout } = useAuth();
  
  if (!hasPermission('manage_products')) {
    return <div>Access Denied</div>;
  }
  
  return <div>Your content</div>;
}
```

## 8. API Error Handling

Errors are automatically handled via axios interceptors. For 401 errors, user is redirected to login.

Handle errors in components:
```javascript
try {
  await userService.create(userData);
} catch (error) {
  console.error(error.response?.data?.message || error.message);
}
```

## 9. Building for Production

```bash
npm run build
```

Output will be in `dist/` folder - deploy this to your server.

## 10. Testing Authentication Flow

### Test Login
1. Navigate to http://localhost:5173/login
2. Enter credentials
3. Should redirect to /dashboard

### Test Protected Routes
1. Try accessing /users without login
2. Should redirect to /login

### Test Authorization
1. Login with non-admin user
2. Try accessing /users page
3. Should show 403 Unauthorized

## 11. Troubleshooting

### "Cannot find module" errors
- Ensure all imports use correct paths
- Run `npm install` again

### API calls failing
- Check that backend is running
- Verify `VITE_API_BASE_URL` in `.env`
- Check browser Network tab for errors

### Authentication not persisting
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify backend token generation

### Styling issues
- Clear browser cache
- Restart dev server
- Check if all CSS files are imported

## 12. Next Steps

1. **Implement backend** with all required endpoints
2. **Customize styling** - update colors in `src/styles/index.css`
3. **Add more pages** - follow existing patterns
4. **Implement form validation** - enhance `useForm` hook
5. **Add notifications/toasts** - integrate notification library
6. **Setup user settings** - create settings page
7. **Add edit pages** - for users, products, orders
8. **Implement search/filters** - enhance list pages
9. **Add pagination** - for large datasets
10. **Setup CI/CD** - automate builds and deployments

---

For more details, see [PROJECT_SETUP.md](./PROJECT_SETUP.md)
