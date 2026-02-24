# E-Commerce Admin Panel - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Browser / Client                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         React Router (Route Management)              │   │
│  │  App.jsx → ProtectedRoute → AdminLayout            │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ▼                                   │
│  ┌──────────────────┬──────────────────────────────────┐   │
│  │    Auth Pages    │      Protected Pages             │   │
│  ├──────────────────┼──────────────────────────────────┤   │
│  │ • Login          │ • Dashboard                       │   │
│  │ • Register       │ • Users Management               │   │
│  │ • 404/403        │ • Products Management            │   │
│  │                  │ • Orders Management              │   │
│  └──────────────────┴──────────────────────────────────┘   │
│           ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         State Management (Zustand)                  │   │
│  │              authStore.js                           │   │
│  │  • user data                                        │   │
│  │  • token management                                │   │
│  │  • auth actions (login, logout)                    │   │
│  └─────────────────────────────────────────────────────┘   │
│           ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    Custom Hooks (Business Logic)                    │   │
│  │  • useAuth() - Auth context + permissions          │   │
│  │  • useForm() - Form state management               │   │
│  │  • useFetch() - Data fetching                       │   │
│  └─────────────────────────────────────────────────────┘   │
│           ▼                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │    API Service Layer (axios instance)               │   │
│  │  • Request interceptors (add token)                 │   │
│  │  • Response interceptors (error handling)           │   │
│  │  • Base configuration                              │   │
│  └─────────────────────────────────────────────────────┘   │
│           ▼                                                   │
│  ┌──────────────────┬──────────────┬──────────────────┐    │
│  │ authService.js   │userService.js│productService.js │    │
│  │ orderService.js  │dashboardServ.│                  │    │
│  └──────────────────┴──────────────┴──────────────────┘    │
│                          ▼                                   │
└─────────────────────────────────────────────────────────────┘
                          │ HTTP/JWT
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND API (Node/Express)                 │
├─────────────────────────────────────────────────────────────┤
│  POST /api/auth/login                                       │
│  POST /api/auth/register                                    │
│  GET  /api/auth/me                                          │
│  GET  /api/users, POST /api/users, PUT/DELETE              │
│  GET  /api/products, POST ..., PUT/DELETE                 │
│  GET  /api/orders, PATCH /api/orders/:id/status           │
│  GET  /api/dashboard/stats                                 │
└─────────────────────────────────────────────────────────────┘
                          │ SQL/MongoDB
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE                                 │
│  users, products, orders, permissions tables/collections   │
└─────────────────────────────────────────────────────────────┘
```

## Authentication & Authorization Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      LOGIN FLOW                             │
└─────────────────────────────────────────────────────────────┘

User Input (Login.jsx)
     │
     ▼
useAuth Hook
     │
     ▼
authStore.login(email, password)
     │
     ▼
authService.login() [API call]
     │
     ▼ HTTP POST to /api/auth/login
     │
Backend validates credentials
     │
     ▼ Returns: { token, user: { id, name, role, permissions } }
     │
Store in localStorage
     │
     ▼
Update authStore (user, token, isAuthenticated)
     │
     ▼
Redirect to /dashboard
     │
     ▼ on App init: checkAuth() → Restore session from localStorage
     │
     ▼
All API requests include: Authorization: Bearer <token>
```

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTHORIZATION FLOW                         │
└─────────────────────────────────────────────────────────────┘

User navigates to /users
     │
     ▼
Router renders Route
     │
     ▼
ProtectedRoute checks:
   • isAuthenticated? → redirect to /login
   • hasRole(['admin', 'manager'])? → redirect to /unauthorized
     │
     ▼
Render AdminLayout + Users component
     │
     ▼
Sidebar filters menu items:
   • menuItems.filter(item => !item.permission || hasPermission(item.permission))
     │
     ▼
Components check permissions:
   • useAuth().hasPermission('manage_users') → Show/hide features
```

## Data Flow Example (Users Page)

```
Users.jsx Component
     │
     ├─ useEffect(() => fetchUsers())
     │
     ▼
useFetch(userService.getAll)
     │
     ▼
userService.getAll()
     │
     ▼
api.get('/users')  ← axios instance
     │
     ├─ Request Interceptor: Add Authorization header
     │
     ▼ HTTP GET /api/users
     │    Headers: { Authorization: 'Bearer token...' }
     │
Backend:
   • Verify token
   • Check user role/permissions
   • Return users from database
     │
     ▼ HTTP Response: [ user1, user2, user3... ]
     │
     ├─ Response Interceptor: Handle errors
     │
     ▼
Return data via useFetch
     │
     ▼
Component state updated
     │
     ▼
Render table with users
     │
     ├─ User clicks Delete
     │
     ▼
userService.delete(userId)
     │
     ├─ Request with Authorization header
     │
     ▼ HTTP DELETE /api/users/:id
     │
Backend updates database
     │
     ▼
Update component state
     │
     ▼
Remove user from table
```

## Component Hierarchy

```
App.jsx (Router)
│
├─ Route: /login
│  └─ Login.jsx
│
├─ Route: /register
│  └─ Register.jsx
│
├─ Route: /dashboard (Protected)
│  └─ ProtectedRoute → AdminLayout
│                       ├─ Header
│                       │  └─ User Profile Dropdown
│                       ├─ Sidebar
│                       │  └─ Navigation Menu
│                       ├─ Main Content
│                       │  └─ Dashboard.jsx
│                       │      ├─ Stats Cards
│                       │      ├─ Recent Orders
│                       │      └─ Top Products
│                       └─ Footer
│
├─ Route: /users (Protected)
│  └─ ProtectedRoute → AdminLayout
│                       └─ Users.jsx
│                           ├─ Search Filter
│                           ├─ Data Table
│                           ├─ Action Buttons
│                           └─ Add User Button
│
├─ Route: /products (Protected)
│  └─ ProtectedRoute → AdminLayout
│                       └─ Products.jsx
│
├─ Route: /orders (Protected)
│  └─ ProtectedRoute → AdminLayout
│                       └─ Orders.jsx
│
└─ Route: /unauthorized
   └─ Unauthorized.jsx (403 Error)
```

## State Management Structure

```
authStore (Zustand)
├─ State:
│  ├─ user: { id, name, email, role, permissions }
│  ├─ token: "eyJhbGc..."
│  ├─ isAuthenticated: boolean
│  ├─ isLoading: boolean
│  └─ error: string | null
│
└─ Actions:
   ├─ login(email, password)
   ├─ register(userData)
   ├─ logout()
   ├─ setUser(user)
   └─ checkAuth()
```

## API Service Pattern

```
Service File (e.g., userService.js)
│
├─ Import axios instance
│
├─ Export service object:
│  ├─ getAll(params)
│  │  └─ api.get('/users', { params })
│  │      └─ Returns: Promise<response.data>
│  │
│  ├─ getById(id)
│  │  └─ api.get(`/users/${id}`)
│  │
│  ├─ create(data)
│  │  └─ api.post('/users', data)
│  │
│  ├─ update(id, data)
│  │  └─ api.put(`/users/${id}`, data)
│  │
│  └─ delete(id)
│     └─ api.delete(`/users/${id}`)
│
Component Usage:
   └─ userService.getAll()
      .then(response => setUsers(response.data))
      .catch(error => setError(error.message))
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                  USERNAME/PASSWORD                          │
│  (Only on Login endpoint, over HTTPS)                       │
└─────────────────────────────────────────────────────────────┘
                          │ Verified
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  JWT TOKEN RECEIVED                         │
│  Stored in localStorage                                     │
└─────────────────────────────────────────────────────────────┘
                          │ Attached to all requests
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              REQUEST INTERCEPTOR                            │
│  Add Authorization: Bearer <token> to headers              │
└─────────────────────────────────────────────────────────────┘
                          │ HTTP Request
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND VERIFICATION                       │
│  • Verify token signature                                   │
│  • Check expiration                                         │
│  • Extract user data                                        │
│  • Verify permissions                                       │
└─────────────────────────────────────────────────────────────┘
                          │ Verified
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               RETURN PROTECTED DATA                         │
│  Only if token valid and user has permission              │
└─────────────────────────────────────────────────────────────┘
                          │ 401/403 if unauthorized
                          ▼
┌─────────────────────────────────────────────────────────────┐
│            RESPONSE INTERCEPTOR                             │
│  Handle 401 → Redirect to login                           │
│  Handle 403 → Redirect to unauthorized                     │
└─────────────────────────────────────────────────────────────┘
```

## Role & Permission System

```
Roles:
├─ ADMIN
│  └─ All permissions
│
├─ MANAGER
│  ├─ manage_users
│  └─ manage_products
│
├─ STAFF
│  ├─ view_dashboard
│  ├─ manage_orders
│  └─ view_reports
│
└─ VIEWER
   └─ view_dashboard (read-only)

Permissions:
├─ view_dashboard
├─ manage_users
├─ manage_products
├─ manage_orders
├─ view_reports
└─ manage_settings

Check Points:
├─ Route Level
│  └─ ProtectedRoute requires role
│
├─ Component Level
│  └─ useAuth().hasPermission() in render
│
├─ Menu Level
│  └─ Filter menuItems by permission
│
└─ API Level
    └─ Backend validates permission before returning data
```

---

This architecture ensures:
✅ Secure authentication with JWT
✅ Role-based access control at multiple levels
✅ Clear separation of concerns
✅ Reusable services and hooks
✅ Centralized state management
✅ Error handling throughout
✅ Responsive user experience
✅ Easy to extend and maintain
