# Project Structure Overview

## Complete Directory Tree

```
m-admin/
├── public/
├── src/
│   ├── components/                    # Reusable components (empty - ready for expansion)
│   │
│   ├── pages/                         # Page components
│   │   ├── Login.jsx                  # Login page
│   │   ├── Register.jsx               # Registration page
│   │   ├── Dashboard.jsx              # Admin dashboard with stats
│   │   ├── Users.jsx                  # User management list
│   │   ├── Products.jsx               # Product management list
│   │   ├── Orders.jsx                 # Order management list
│   │   ├── Unauthorized.jsx           # 403 error page
│   │   └── NotFound.jsx               # 404 error page
│   │
│   ├── layout/                        # Layout components
│   │   ├── AdminLayout.jsx            # Main admin layout wrapper
│   │   ├── Header.jsx                 # Top header with user menu
│   │   ├── Sidebar.jsx                # Navigation sidebar
│   │   └── Footer.jsx                 # Footer component
│   │
│   ├── services/                      # API service layer
│   │   ├── api.js                     # Axios instance with interceptors
│   │   ├── authService.js             # Authentication API calls
│   │   ├── userService.js             # User management API
│   │   ├── productService.js          # Product management API
│   │   ├── orderService.js            # Order management API
│   │   └── dashboardService.js        # Dashboard statistics API
│   │
│   ├── store/                         # State management (Zustand)
│   │   └── authStore.js               # Authentication state with Zustand
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAuth.js                 # Auth context hook with permissions
│   │   ├── useForm.js                 # Form state and handling
│   │   ├── useFetch.js                # Data fetching hook
│   │   └── index.js                   # Hooks barrel export
│   │
│   ├── middleware/                    # Route & auth middleware
│   │   └── ProtectedRoute.jsx         # Route protection component
│   │
│   ├── constants/                     # Application constants
│   │   └── apiEndpoints.js            # API endpoints, roles, permissions
│   │
│   ├── utils/                         # Utility functions
│   │   └── tokenUtils.js              # JWT token management utilities
│   │
│   ├── styles/                        # CSS stylesheets
│   │   ├── index.css                  # Global styles & CSS variables
│   │   ├── AdminLayout.css            # Layout styles
│   │   ├── Header.css                 # Header styles
│   │   ├── Sidebar.css                # Sidebar styles
│   │   ├── Footer.css                 # Footer styles
│   │   ├── Auth.css                   # Authentication pages styles
│   │   ├── Dashboard.css              # Dashboard page styles
│   │   ├── List.css                   # List pages (users, products, orders)
│   │   └── Error.css                  # Error pages styles
│   │
│   ├── assets/                        # Images, icons, etc.
│   │
│   ├── App.jsx                        # Main app with routing
│   ├── App.css                        # App styles (kept for compatibility)
│   ├── index.css                      # Additional global styles
│   └── main.jsx                       # React entry point
│
├── .env.example                       # Environment variables template
├── .gitignore
├── eslint.config.js                   # ESLint configuration
├── index.html                         # HTML template
├── package.json                       # Dependencies and scripts
├── PROJECT_SETUP.md                   # Detailed project documentation
├── QUICK_START.md                     # Quick start guide
├── README.md                          # Original README
├── STRUCTURE.md                       # This file
└── vite.config.js                     # Vite configuration

```

## Architectural Overview

### Authentication Flow
```
User Input (Login.jsx)
    ↓
useAuth Hook (useAuth.js)
    ↓
authStore.login() (authStore.js)
    ↓
authService.login() (authService.js)
    ↓
axios instance with interceptors (api.js)
    ↓
Backend API
```

### Authorization Flow
```
ProtectedRoute checks
    ↓
useAuth.hasRole() / hasPermission()
    ↓
Sidebar filters menu based on permissions
    ↓
Components check useAuth.hasPermission()
```

### Data Flow
```
Page Component
    ↓
useFetch Hook or Service Call
    ↓
Service Layer (userService, productService, etc.)
    ↓
API Interceptor (adds token)
    ↓
Backend API
    ↓
Response Handler / Error Handler
    ↓
Component State Update
```

## Key Features by File

### Authentication (`store/authStore.js`)
- Login/Register
- Token management
- User state persistence
- checkAuth() on app init
- logout()

### Protected Routes (`middleware/ProtectedRoute.jsx`)
- Role-based access control
- redirects to /login if not authenticated
- redirects to /unauthorized if role not allowed

### Custom Hooks
- `useAuth()` - Authentication + permissions
- `useForm()` - Form state management
- `useFetch()` - Data fetching with loading states

### Services
- Centralized API calls
- Request/response interceptors
- Error handling
- Token attachment

### Layout
- Responsive sidebar with collapse
- User profile dropdown
- Role-based navigation
- Footer with links

## Security Features

1. **JWT Protection**
   - Token stored in localStorage
   - Auto-refresh on app load
   - Attached to all API requests

2. **Route Protection**
   - ProtectedRoute wrapper
   - Role-based redirection
   - Permission checking

3. **Request Interceptors**
   - Token attachment
   - 401 handling (redirect to login)

4. **RBAC System**
   - 4 role levels
   - 6+ permission types
   - Per-component permission checks

## Styling System

### Colors (CSS Variables)
- `--primary-color`: #3b82f6
- `--danger-color`: #ef4444
- `--secondary-color`: #10b981
- `--dark-color`: #1f2937
- `--light-color`: #f3f4f6

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Ready-to-Use Pages

1. **Login** - Email/password form
2. **Register** - Sign up form
3. **Dashboard** - Stats cards, placeholders for charts
4. **Users** - CRUD list with search
5. **Products** - CRUD list with search
6. **Orders** - List with status update
7. **Unauthorized** - 403 error page
8. **NotFound** - 404 error page

## Next Steps to Implement

1. **Backend API** - Implement all endpoints
2. **Edit Pages** - Create /users/:id, /products/:id pages
3. **Forms** - Add validation and submission
4. **Charts** - Add dashboard charts
5. **Notifications** - Toast/notification system
6. **Pagination** - For large datasets
7. **Filters** - Advanced filtering
8. **Export** - CSV/PDF export
9. **Settings** - Admin settings page
10. **Reports** - Analytics and reports

---

**Project is ready for development!** 🚀
