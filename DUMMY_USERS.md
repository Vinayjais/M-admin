# Dummy Admin Users for Testing

Use these credentials to login and test the admin panel:

## Available Test Users

### 1. Admin User (Full Access)
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** admin
- **Permissions:** All permissions

### 2. Manager User
- **Email:** manager@example.com
- **Password:** manager123
- **Role:** manager
- **Permissions:** view_dashboard, manage_users, manage_products, manage_orders

### 3. Staff User
- **Email:** staff@example.com
- **Password:** staff123
- **Role:** staff
- **Permissions:** view_dashboard, manage_orders, view_reports

### 4. Viewer User (Read-Only)
- **Email:** viewer@example.com
- **Password:** viewer123
- **Role:** viewer
- **Permissions:** view_dashboard

## How It Works

The authentication system uses **mock tokens** for testing:

1. When you login with any of the above credentials, the app generates a mock JWT token
2. The token is stored in localStorage
3. The token is included in all API requests (simulated)
4. User data and permissions are stored in the mock token

## Testing Different Roles

### Test Admin Access
1. Login with admin@example.com
2. Try accessing /users, /products, /orders pages
3. All menu items should be visible
4. All CRUD operations should work

### Test Manager Access
1. Login with manager@example.com
2. Users and Products pages should be accessible
3. Orders page should be accessible but limited
4. Reports and Settings should not be visible in menu

### Test Staff Access
1. Login with staff@example.com
2. Only Orders and Dashboard should be fully accessible
3. Users and Products pages should show 403 Unauthorized

### Test Viewer Access
1. Login with viewer@example.com
2. Only Dashboard should be accessible
3. Other pages should show 403 Unauthorized

## API Calls (Mocked)

Currently, all API calls are mocked in the services. To integrate with a real backend:

1. Update the services in `src/services/` to call your actual API
2. Make sure your backend returns JWT tokens for login
3. Update `VITE_API_BASE_URL` in `.env`

## Registering New Users

You can also register new users during testing:

1. Go to `/register`
2. Enter name, email, and password
3. New users are created with "staff" role by default
4. They will have access to: view_dashboard, manage_orders

## Notes

- Tokens are set to expire in 24 hours (mock)
- All user data is stored in memory (will reset on page refresh unless stored)
- The app uses localStorage to persist authentication state
- This is for development/testing only - replace with real API before production
