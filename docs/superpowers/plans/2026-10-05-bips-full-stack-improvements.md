# BIPS Full Stack Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve critical runtime crashes, eliminate privilege escalation vulnerabilities, unify API communication, wire admin UI pages to live backend APIs, add MongoDB pagination, and repair repository configuration across BIPS.

**Architecture:** 
- Fix broken Express routes, middleware signature handling, and controller error states.
- Standardize all client API calls on the central `axiosInstance` with environment-aware baseURL.
- Refactor client hooks to follow React rules-of-hooks conventions (`use...`) and enforce TanStack Query v5 object syntax.
- Connect admin management tables to backend endpoints with server-side pagination and status mutation flows.
- Harden authentication against role tampering and password truncation.

**Tech Stack:** Express 5, Node.js, MongoDB (Mongoose), React 19, React Router 7, TanStack Query v5, Tailwind CSS v4, DaisyUI.

**Spec:** Identified in audit spike (Phases 1 through 4).

## Global Constraints

- Never hardcode localhost or backend ports in feature modules; use `axiosInstance`.
- Public signup must default strictly to `Resident` with no client role override.
- Password validation must not enforce an artificial short maximum length (e.g. 16 chars).
- React hooks must follow `use<Name>` naming conventions to pass ESLint without errors.
- TanStack Query v5 queries and invalidations must use `{ queryKey: [...] }`.
- Route wildcards for SPA fallback in Express 5 must use `{/*splat}` or catch-all middleware.

## Review Focus

1. **Login flow navigation**: When credentials fail, user stays on login with error toast; when successful, redirects to appropriate role dashboard without throwing `navigate is not defined`.
2. **Role middleware argument format**: `authorizedRoles("Admin", "Staff")` vs `authorizedRoles(["Admin", "Staff"])` must both be handled safely or unified to prevent false 403 Access Denied.
3. **Admin PATCH update vs POST create**: Updating an announcement via `PATCH /api/v1/announcement/update-announcement/:id` updates the existing document rather than creating a new one.
4. **Empty collections aggregate handling**: When no certificates or announcements exist, admin endpoints return `{ total: 0 }` JSON rather than crashing or sending raw text.
5. **Static file access**: Uploaded files in `server/uploads` must be accessible over HTTP static serving.

---

### Task 1: Fix Server Route & Controller Runtime Bugs (Phase 1 Backend)

**Files:**
- Modify: `server/src/routes/user_routes.js`
- Modify: `server/src/middlewares/auth_roles.js`
- Modify: `server/src/routes/announcement_route.js`
- Modify: `server/src/controllers/admin_controller.js`
- Modify: `server/src/index.js`

**Interfaces:**
- Consumes: `protectRoute` from `auth_middleware.js`, `updateAnnouncement` from `announcement_controller.js`.
- Produces: Working `/api/v1/users/admin` route, flexible `authorizedRoles`, proper `updateAnnouncement` routing, and robust JSON admin statistics.

- [ ] **Step 1: Fix `authorizedRoles` middleware to handle both array and rest arguments**
  Update `server/src/middlewares/auth_roles.js` to flatten `allowedRoles`:
  ```javascript
  export const authorizedRoles = (...roles) => {
    const allowed = roles.flat();
    return (req, res, next) => {
      if (!allowed.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
  };
  ```

- [ ] **Step 2: Fix `user_routes.js` route registrations**
  In `server/src/routes/user_routes.js`:
  - Mount `/admin` for Admin and `/admin/staff` for Admin & Staff cleanly without broken string comparisons.
  - Fix `/admin/total` authorization call to pass role strings.

- [ ] **Step 3: Connect `updateAnnouncement` to PATCH route in `announcement_route.js`**
  Import `updateAnnouncement` from `../controllers/announcement_controller.js` and bind it to `PATCH /update-announcement/:id`.

- [ ] **Step 4: Fix `admin_controller.js` crashes and empty error handling**
  - Return `{ total: 0, statusCounts: [] }` in `totalCertificateRequest` when no certificates exist, and return JSON (`res.json(...)`).
  - Add proper error response to `catch` in `totalAnnouncement`.
  - Return `{ count: 0 }` with HTTP 200 in `getAllResident` when count is 0.

- [ ] **Step 5: Fix Express 5 static & SPA fallback and serve uploads in `server/src/index.js`**
  - Add `app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));`
  - Support `CLIENT_URL` in CORS configuration.
  - Use `{/*splat}` for SPA fallback in production.

- [ ] **Step 6: Commit Task 1**
  ```bash
  git add server/src/
  git commit -m "fix(server): resolve routing, role middleware, and admin controller crashes"
  ```

---

### Task 2: Fix Client Authentication, Hook Naming & Runtime Crashes (Phase 1 Frontend)

**Files:**
- Modify: `client/src/pages/Login.jsx`
- Modify: `client/src/hooks/UseAuthRouteHooks.js`
- Modify: `client/src/hooks/UseAnnouncementRouteHooks.js`
- Modify: `client/src/hooks/UseUserRouteHooks.js`
- Modify: `client/src/api/auth_api.js`

**Interfaces:**
- Consumes: `/api/v1/auth/*` endpoints and `/api/v1/users/resident`.
- Produces: `useCheckAuth`, `useLogin`, `useSignup`, `useLogout`, `useAnnouncements`, `useResidentCount`.

- [ ] **Step 1: Fix `Login.jsx` navigation and form submit**
  - Import `useNavigate` from `react-router-dom` and initialize `const navigate = useNavigate()`.
  - Remove synchronous `navigate("/welcome")` and manual query invalidation from `handleSubmit`; let the mutation's `onSuccess` handle navigation and cache updates.
  - Show error toast if mutation fails.

- [ ] **Step 2: Refactor `UseAuthRouteHooks.js` to compliant naming and Query v5 syntax**
  - Rename hooks to `useCheckAuth`, `useLogin`, `useSignup`, `useLogout`.
  - Fix login redirect logic: read user role from `data.role` (since API returns `{ _id, role, ... }` directly).
  - Invalidate `{ queryKey: ["user"] }` using object syntax.

- [ ] **Step 3: Fix `auth_api.js` `getUserInfo` and undeclared axios**
  - Use `axiosInstance` for `getUserInfo` and point to `/users/resident`.
  - Remove redundant try/catch.

- [ ] **Step 4: Rename hooks in `UseAnnouncementRouteHooks.js` and `UseUserRouteHooks.js`**
  - Rename to `useCreateAnnouncement`, `useAnnouncements`, `useResidentCount` to follow React rules of hooks.

- [ ] **Step 5: Verify client compiles and test login flow**
  Run: `npm run lint --prefix client`
  Expected: Hook name errors and login undeclared variable errors resolved.

- [ ] **Step 6: Commit Task 2**
  ```bash
  git add client/src/
  git commit -m "fix(client): fix login navigation, auth hooks, and hook naming standards"
  ```

---

### Task 3: Security Hardening & API Unification (Phase 2)

**Files:**
- Modify: `server/src/controllers/auth_controller.js`
- Modify: `server/src/validator/auth_validation.js`
- Modify: `client/src/api/certificate_api.js`
- Modify: `client/src/api/incident_api.js`
- Modify: `server/package.json`

**Interfaces:**
- Consumes: `axiosInstance` from `client/src/api/axios.js`.
- Produces: Unified client API modules and secure role assignment on signup.

- [ ] **Step 1: Secure signup role assignment against privilege escalation**
  In `server/src/controllers/auth_controller.js`:
  - Force `role: "Resident"` regardless of what was provided in `req.body`.
  - Fix typo `error.messsage` to `error.message`.

- [ ] **Step 2: Remove artificial password length cap in `loginSchema`**
  In `server/src/validator/auth_validation.js`:
  - Change `loginSchema` password to `z.string().min(8)` (remove `.max(16)`).

- [ ] **Step 3: Unify `certificate_api.js` and `incident_api.js` with `axiosInstance`**
  - Replace raw `axios` and hardcoded `http://localhost:4000/api/v1` with `axiosInstance` relative paths (`/certificate/*`, `/incidents/*`).

- [ ] **Step 4: Commit Task 3**
  ```bash
  git add server/src/ client/src/api/
  git commit -m "sec: enforce resident signup role, fix password validation, and unify client api instances"
  ```

---

### Task 4: Connect Admin UI Pages to Real Backend APIs (Phase 3)

**Files:**
- Modify: `client/src/App.jsx`
- Modify: `client/src/pages/AdminUI/pages/DocumentsManagement.jsx`
- Modify: `client/src/pages/AdminUI/pages/IncidentReports.jsx`
- Modify: `client/src/pages/AdminUI/pages/AnnouncementsManagement.jsx`
- Modify: `client/src/pages/AdminUI/pages/UserManagement.jsx`

**Interfaces:**
- Consumes: `getCertificateRequestsApi`, `approveCertificateRequestApi`, `readyCertificateRequestApi`, `rejectCertificateRequestApi`, `getIncidentsApi`, `updateIncidentApi`, `useAnnouncements`, `useCreateAnnouncement`.
- Produces: Live admin management pages connected to backend APIs.

- [ ] **Step 1: Fix route collisions and nested admin routing in `App.jsx`**
  - Prefix admin routes under `/admin` or distinct paths: `/admin/announcements` instead of duplicate `/announcements`.
  - Ensure public `/announcements` and admin management do not collide.

- [ ] **Step 2: Connect `DocumentsManagement.jsx` to certificate APIs**
  - Replace `mockDocuments` with React Query calling `getCertificateRequestsApi`.
  - Wire Approve, Ready for Pickup, and Reject action buttons to API mutations.
  - Show loading skeleton and error states.

- [ ] **Step 3: Connect `IncidentReports.jsx` to incident APIs**
  - Replace `mockIncidents` with React Query calling `getIncidentsApi`.
  - Wire status and resolution notes updates to `updateIncidentApi`.

- [ ] **Step 4: Connect `AnnouncementsManagement.jsx` to announcement APIs**
  - Wire create announcement modal and delete actions to `useAnnouncements` and `useCreateAnnouncement`.

- [ ] **Step 5: Verify in client**
  Run: `npm run build --prefix client`
  Expected: Clean build with 0 errors.

- [ ] **Step 6: Commit Task 4**
  ```bash
  git add client/src/
  git commit -m "feat(admin): wire documents, incidents, and announcements management to backend apis"
  ```

---

### Task 5: Database Pagination, DevOps & Clean-up (Phase 4)

**Files:**
- Modify: `server/src/controllers/cert_request_controller.js`
- Modify: `server/src/controllers/incident_controller.js`
- Modify: `server/.gitignore`
- Modify: `package.json`
- Delete: `server/src/workflow/statusGuard.js`

**Interfaces:**
- Produces: Paginated API responses `{ data, total, page, totalPages }`, clean `.gitignore`, and concurrent dev runner.

- [ ] **Step 1: Implement MongoDB database-level pagination & search for Certificate Requests**
  In `getAllCertificateRequests`:
  - Extract `page = 1, limit = 10, search, status, certificate_type` from `req.query`.
  - Use Mongoose query filtering with `$regex` for search instead of in-memory `.filter()`.
  - Apply `.skip((page - 1) * limit).limit(limit)`.
  - Return `{ requests, total, page, totalPages }`.

- [ ] **Step 2: Implement MongoDB database-level pagination & search for Incidents**
  In `getAllIncidents`:
  - Extract `page = 1, limit = 10, search, status, category, priority`.
  - Use Mongoose query with `$regex`.
  - Apply `.skip((page - 1) * limit).limit(limit)`.
  - Return `{ incidents, total, page, totalPages }`.

- [ ] **Step 3: Fix `server/.gitignore` and remove dead code**
  - Remove `package.json` and `package-lock.json` from `server/.gitignore`.
  - Remove dead `statusGuard.js`.

- [ ] **Step 4: Add unified `dev` script in root `package.json`**
  - Add `concurrently` devDependency or script to run client and server simultaneously.

- [ ] **Step 5: Final verification across client and server**
  - Run `npm run lint --prefix client`
  - Run `npm run build --prefix client`
  - Start server and check console for error-free initialization.

- [ ] **Step 6: Commit Task 5**
  ```bash
  git add server/ package.json
  git commit -m "perf: add mongodb pagination, clean gitignore, and optimize dev scripts"
  ```
