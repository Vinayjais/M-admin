# Admin Panel - Login Testing Guide

## 🚀 Development Server

The development server is running at: **http://localhost:5174**

## 📝 Dummy Credentials for Testing

### Test User Accounts

All test users have been pre-configured for you to test different roles and permissions:

#### 1️⃣ Admin User (Full Access)
```
Email:    admin@example.com
Password: admin123
Role:     Admin
Access:   All features and pages
```

#### 2️⃣ Manager User
```
Email:    manager@example.com
Password: manager123
Role:     Manager
Access:   Dashboard, Users, Products, Orders
```

#### 3️⃣ Staff User
```
Email:    staff@example.com
Password: staff123
Role:     Staff
Access:   Dashboard, Orders (view & manage)
```

#### 4️⃣ Viewer User (Read-Only)
```
Email:    viewer@example.com
Password: viewer123
Role:     Viewer
Access:   Dashboard only (read-only)
```

## 🧪 Testing Scenarios

### Scenario 1: Full Admin Access
1. Go to http://localhost:5174/login
2. Enter: `admin@example.com` / `admin123`
3. Click Login
4. **Expected:** Redirected to Dashboard with full access
5. **Try:** Click on Users, Products, Orders, Settings in sidebar
6. **Result:** All pages should be accessible

### Scenario 2: Manager Access (Limited Access)
1. Logout (click user profile → Logout)
2. Login with: `manager@example.com` / `manager123`
3. **Expected:** Dashboard loads with manager access
4. **Try:** Visit /users, /products, /orders
5. **Result:** All three pages accessible
6. **Try:** Visit /settings (if exists)
7. **Result:** Should show 403 Unauthorized or redirect

### Scenario 3: Staff Access (Orders Only)
1. Logout and login with: `staff@example.com` / `staff123`
2. **Expected:** Dashboard with limited menu
3. **Try:** Click on Users or Products
4. **Result:** Should show 403 Unauthorized
5. **Try:** Click on Orders
6. **Result:** Should be accessible

### Scenario 4: Viewer Access (Read-Only)
1. Logout and login with: `viewer@example.com` / `viewer123`
2. **Expected:** Only Dashboard visible in sidebar
3. **Try:** Access /users, /products, /orders directly
4. **Result:** All should show 403 Unauthorized
5. **Expected:** Dashboard has read-only data only

### Scenario 5: Invalid Login
1. Try: `wrong@example.com` / `password123`
2. **Expected:** Error message "Invalid email or password"
3. **Result:** Stays on login page

### Scenario 6: Session Persistence
1. Login with admin account
2. Refresh the page
3. **Expected:** Still logged in (session persists in localStorage)
4. **Action:** Clear browser storage (DevTools → Application → Storage → Clear All)
5. **Expected:** Redirected to login page

## 🔍 What to Verify

### ✅ Authentication
- [x] Login works with valid credentials
- [x] Invalid credentials show error
- [x] User data displays in header
- [x] Logout clears session
- [x] Session persists on refresh

### ✅ Authorization
- [x] Admin can access all pages
- [x] Manager cannot access admin-only pages
- [x] Staff can only access Orders
- [x] Viewer is read-only
- [x] Unauthorized access shows 403 page

### ✅ UI Features
- [x] Header shows logged-in user
- [x] Sidebar shows role-based menu
- [x] User dropdown menu works
- [x] Sidebar collapse/expand works
- [x] Dashboard displays stats
- [x] List pages display data
- [x] Responsive design works on mobile

### ✅ Data Display
- [x] Dashboard shows stat cards
- [x] Users list loads (mock data)
- [x] Products list loads (mock data)
- [x] Orders list loads (mock data)
- [x] Search filters work
- [x] Action buttons work

## 🔧 Technical Details

### Authentication Flow
1. User enters email and password
2. `authStore.login()` checks against `DUMMY_USERS`
3. If valid, generates mock JWT token
4. Stores token in localStorage
5. Updates app state with user data
6. Redirects to dashboard

### Token Structure (Mock)
```
Header:  { alg: 'HS256', typ: 'JWT' }
Payload: { 
  id, email, role, permissions, exp (24 hours)
}
Signature: 'mock-signature'
```

### Storage
- Token stored in: `localStorage['auth-storage']`
- JSON format with token, user, isAuthenticated
- Persists until logout

## 🚨 Known Limitations (Testing Only)

- No real API calls (all mocked)
- Tokens don't validate with real backend
- No real database (data in memory)
- Register creates user in memory only
- Session lost on hard refresh of app code

## 🔄 Switching Between Users

Quick way to test different roles:

1. Click user profile in top-right corner
2. Click "Logout"
3. Login with different credentials
4. Repeat

## 📊 Mock Data

The application loads with:
- 4 pre-configured test users
- Mock data for Users, Products, and Orders lists
- Mock dashboard statistics

## 🎯 Next Steps After Testing

1. **Backend Integration:**
   - Update API endpoints in `src/constants/apiEndpoints.js`
   - Modify `src/services/` to call real API instead of mocked auth
   - Replace `authStore.js` mock login with real API calls

2. **Production Deployment:**
   - Remove dummy users from code
   - Connect to real authentication system
   - Update API base URL in `.env`
   - Configure CORS with backend

3. **Additional Testing:**
   - Test with real user accounts
   - Verify all API endpoints
   - Load test the application
   - Security audit

## 💡 Tips

- Open DevTools (F12) → Network tab to see API calls
- Check localStorage in DevTools → Application to see token
- Use different browsers for concurrent testing
- Test on mobile using DevTools responsive mode
- Check browser console for any errors

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify localStorage has auth data
3. Check Network tab for failed requests
4. Clear cache and localStorage, then refresh

---

**Ready to test!** 🚀 Open http://localhost:5174 and login with any of the credentials above.
