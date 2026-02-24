# E-Commerce Admin Panel

A comprehensive admin dashboard for managing e-commerce operations with authentication, authorization, and role-based access control.

## 📋 Project Structure

```
src/
├── components/           # Reusable UI components
├── pages/               # Page components (Dashboard, Users, Products, Orders)
├── layout/              # Layout components (Header, Sidebar, Footer, AdminLayout)
├── services/            # API service layer
│   ├── api.js          # Axios instance with interceptors
│   ├── authService.js  # Authentication API calls
│   ├── userService.js  # User management API calls
│   ├── productService.js
│   ├── orderService.js
│   └── dashboardService.js
├── store/              # State management (Zustand)
│   └── authStore.js    # Authentication state
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication hook with permissions check
│   ├── useForm.js      # Form handling hook
│   └── useFetch.js     # Data fetching hook
├── middleware/         # Middleware & guards
│   └── ProtectedRoute.jsx  # Route protection with role-based access
├── constants/          # Application constants
│   └── apiEndpoints.js # API endpoints and role/permission definitions
├── utils/              # Utility functions
│   └── tokenUtils.js   # JWT token management
├── styles/             # CSS files
└── assets/             # Images, icons, etc.
```

## 🔐 Authentication & Authorization

### Features
- **JWT-based Authentication**: Secure token-based auth system
- **Role-Based Access Control (RBAC)**: 4 role levels (admin, manager, staff, viewer)
- **Permission Management**: Fine-grained permission system
- **Protected Routes**: Automatic route protection based on roles
- **Persistent Sessions**: Token stored in localStorage
- **Token Expiration**: Automatic logout on token expiration

### Roles
- **Admin**: Full access to all features
- **Manager**: Can manage users and products
- **Staff**: Can view and manage orders
- **Viewer**: Read-only access to dashboard

### Permissions
- `view_dashboard` - Access dashboard
- `manage_users` - Create, edit, delete users
- `manage_products` - Create, edit, delete products
- `manage_orders` - View and update orders
- `view_reports` - Access reports
- `manage_settings` - Access admin settings

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `VITE_API_BASE_URL` with your backend API URL

### Running the Application

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

**Preview Build:**
```bash
npm run preview
```

**Linting:**
```bash
npm run lint
```

## 📦 Dependencies

### Production
- **react** (19.2.0): UI library
- **react-dom** (19.2.0): React DOM rendering
- **react-router-dom** (6.20.0): Client-side routing
- **zustand** (4.4.1): State management
- **axios** (1.6.2): HTTP client
- **jwt-decode** (4.0.0): JWT decoding

### DevDependencies
- Vite & React plugins
- ESLint & React linting plugins
- TypeScript type definitions

## 🔄 API Integration

### Base Structure
All API calls go through `/api/` endpoint with JWT token in Authorization header:

```javascript
Authorization: Bearer <token>
```

### API Endpoints

**Authentication:**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

**Users:**
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**Products:**
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Orders:**
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status

**Dashboard:**
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/revenue` - Get revenue data

## 🎯 Key Features Implemented

### 1. Authentication System
- Login/Register pages
- JWT token management
- Automatic token refresh
- Logout functionality
- Session persistence

### 2. Authorization
- Role-based route protection
- Permission checking in components
- Automatic redirection for unauthorized access
- 403 Unauthorized page

### 3. Admin Pages
- **Dashboard**: Overview with stats cards, recent orders, top products
- **Users**: User list with search, create, edit, delete, role management
- **Products**: Product management with search, pricing, stock management
- **Orders**: Order list with status tracking and updates

### 4. Layout Components
- **Header**: User profile dropdown, logout
- **Sidebar**: Navigation with role-based menu items
- **Footer**: Copyright and links
- **AdminLayout**: Main layout wrapper

### 5. Hooks
- `useAuth()`: Authentication context and permission checking
- `useForm()`: Form handling with validation
- `useFetch()`: Data fetching with loading/error states

### 6. API Service
- Centralized API configuration
- Request/response interceptors
- Token attachment to headers
- Error handling

## 🎨 Styling

The application uses **CSS Grid and Flexbox** for responsive design:
- Mobile-first approach
- Responsive tables and forms
- Collapsible sidebar
- Color scheme with CSS variables
- Smooth transitions and animations

## 🔒 Security Features

- JWT token validation
- Automatic logout on token expiration
- Protected routes with role verification
- Secure localStorage usage
- CORS-ready API configuration
- XSS prevention through React

## 📱 Responsive Design

- Mobile-first design approach
- Tablet optimization (768px breakpoint)
- Desktop-optimized layouts
- Collapsible navigation
- Touch-friendly buttons and inputs

## 🚦 Best Practices

1. **Component Structure**: Organized by feature/page
2. **State Management**: Centralized with Zustand
3. **API Calls**: Abstracted via service layer
4. **Error Handling**: Comprehensive error messages
5. **Loading States**: Visual feedback during async operations
6. **Form Handling**: Reusable form hook with validation
7. **Route Protection**: Middleware-based access control

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Vite Configuration
Already configured in `vite.config.js` with React plugin support.

### ESLint Configuration
Configured in `eslint.config.js` with React and React-Hooks plugins.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

Guidelines for contributing to this project:
1. Follow the existing code structure
2. Create feature branches
3. Write meaningful commit messages
4. Test auth flows thoroughly
5. Update documentation as needed

## 📝 License

This project is licensed under the MIT License.

## ✅ Checklist for Customization

Before deploying:
- [ ] Update API base URL in `.env`
- [ ] Test all authentication flows
- [ ] Verify role-based access control
- [ ] Update branding (logo, colors, text)
- [ ] Configure CORS on backend
- [ ] Test error handling
- [ ] Set up production build
- [ ] Configure security headers
- [ ] Test on mobile devices
- [ ] Update API endpoints if needed

---

**Happy coding!** 🚀
