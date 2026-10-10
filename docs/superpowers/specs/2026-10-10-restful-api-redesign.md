# Specification: RESTful API Redesign (Approach B — Clean Break)

## 1. Overview & Objective
Refactor and redesign all backend API endpoints into meaningful, idiomatic RESTful conventions (nouns for resources, standard HTTP verbs for actions, kebab-case for URL params, consistent pluralization, clean resource nesting). Remove redundant actions in URLs (e.g., `/create-announcement`, `/get-announcement`, `/admin/create`). Align all frontend client API callers accordingly.

---

## 2. API Endpoint Mapping Specification

### 2.1 Announcements (`/api/v1/announcements`)
Base path updated from `/api/v1/announcement` to `/api/v1/announcements`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `GET` | `/announcement/get-announcement` | `/api/v1/announcements` | Fetch all announcements | Public / Resident |
| `POST` | `/announcement/create-announcement` | `/api/v1/announcements` | Create new announcement | Admin, Staff |
| `PATCH` | `/announcement/update-announcement/:id` | `/api/v1/announcements/:id` | Update announcement | Admin, Staff |
| `DELETE` | `/announcement/delete-announcement/:id` | `/api/v1/announcements/:id` | Delete announcement | Admin, Staff |

---

### 2.2 Certificates (`/api/v1/certificates`)
Base path updated from `/api/v1/certificate` to `/api/v1/certificates`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `POST` | `/certificate/certificate` | `/api/v1/certificates` | Request certificate | Resident |
| `GET` | `/certificate/my-requests` | `/api/v1/certificates/me` | Fetch resident's certificates | Resident |
| `GET` | `/certificate/requests` | `/api/v1/certificates` | Fetch all certificate requests | Admin, Staff |
| `PATCH` | `/certificate/request/:id/approve` | `/api/v1/certificates/:id/approve` | Approve request | Admin, Staff |
| `PATCH` | `/certificate/request/:id/ready` | `/api/v1/certificates/:id/ready` | Mark request ready for pickup | Admin, Staff |
| `PATCH` | `/certificate/request/:id/reject` | `/api/v1/certificates/:id/reject` | Reject request | Admin, Staff |

---

### 2.3 Authentication & Session (`/api/v1/auth`)
Base path: `/api/v1/auth`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `POST` | `/auth/signup` | `/api/v1/auth/signup` | Register new resident account | Public |
| `POST` | `/auth/login` | `/api/v1/auth/login` | Email/password login | Public |
| `POST` | `/auth/google` | `/api/v1/auth/google` | Google OAuth login | Public |
| `POST` | `/auth/logout` | `/api/v1/auth/logout` | Clear auth cookies | Authenticated |
| `GET` | `/auth/checkAuth` | `/api/v1/auth/me` | Validate session and return current user | Authenticated |

---

### 2.4 User Management & Analytics (`/api/v1/users`)
Base path: `/api/v1/users`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `GET` | `/users/resident` | `/api/v1/users/profile` | Current resident profile details | Authenticated |
| `GET` | `/users/admin/list` | `/api/v1/users` | List all users (paginated/filtered) | Admin, Staff |
| `POST` | `/users/admin/create` | `/api/v1/users` | Create user | Admin |
| `PATCH` | `/users/admin/:id` | `/api/v1/users/:id` | Update user | Admin |
| `DELETE` | `/users/admin/:id` | `/api/v1/users/:id` | Delete user | Admin |
| `GET` | `/users/admin` | `/api/v1/users/stats/residents` | Total count of residents | Admin |
| `GET` | `/users/admin/total` | `/api/v1/users/stats/certificates` | Total certificate requests summary | Admin, Staff |
| `GET` | `/users/total/announcement` | `/api/v1/users/stats/announcements` | Total announcements summary | Admin, Staff |

---

### 2.5 Incident Reports (`/api/v1/incidents`)
Base path: `/api/v1/incidents`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `POST` | `/incidents` | `/api/v1/incidents` | Create incident report | Resident |
| `GET` | `/incidents/my-incidents` | `/api/v1/incidents/me` | Fetch current resident's incidents | Resident |
| `GET` | `/incidents` | `/api/v1/incidents` | Fetch all incident reports | Admin, Staff |
| `PATCH` | `/incidents/:id` | `/api/v1/incidents/:id` | Update incident status/notes | Admin, Staff |

---

### 2.6 Community Stories (`/api/v1/stories`)
Base path: `/api/v1/stories`.

| Method | Legacy Endpoint | New RESTful Endpoint | Description | Auth / Roles |
|---|---|---|---|---|
| `GET` | `/stories/published` | `/api/v1/stories` | Fetch published community stories | Public / Resident |
| `POST` | `/stories` | `/api/v1/stories` | Submit story | Resident, Staff, Admin |
| `GET` | `/stories/my-stories` | `/api/v1/stories/me` | Fetch user's submitted stories | Authenticated |
| `PATCH` | `/stories/:id` | `/api/v1/stories/:id` | Update pending story | Owner |
| `DELETE` | `/stories/:id` | `/api/v1/stories/:id` | Delete pending story | Owner |
| `GET` | `/stories/admin/all` | `/api/v1/stories/moderation` | List all stories for moderation | Admin, Staff |
| `PATCH` | `/stories/admin/:id/status` | `/api/v1/stories/:id/status` | Update story moderation status | Admin, Staff |
| `DELETE` | `/stories/admin/:id` | `/api/v1/stories/moderation/:id` | Delete story from moderation queue | Admin, Staff |

---

## 3. Frontend Client API Updates
Update all client query callers in `client/src/api/`:
- `auth_api.js`: update `checkAuth` to `/auth/me`, `getUserInfo` to `/users/profile`.
- `announcement_api.js`: update create to `POST /announcements`, fetch to `GET /announcements`.
- `certificate_api.js`: update create to `POST /certificates`, my-requests to `GET /certificates/me`, list to `GET /certificates`, actions to `/certificates/:id/approve`, `/certificates/:id/ready`, `/certificates/:id/reject`.
- `user_api.js`: update user list to `GET /users`, create to `POST /users`, update to `PATCH /users/:id`, delete to `DELETE /users/:id`, count to `/users/stats/residents`.
- `incident_api.js`: update my-incidents to `GET /incidents/me`.
- `story_api.js`: update published to `GET /stories`, my-stories to `GET /stories/me`, moderation list to `GET /stories/moderation`, status update to `PATCH /stories/:id/status`, moderation delete to `DELETE /stories/moderation/:id`.
- Component callers: [`AnnouncementsManagement.jsx`](file:///c:/Users/Devon/Desktop/PROJECTS/BIPS/client/src/pages/AdminUI/pages/AnnouncementsManagement.jsx) direct delete call updated to `DELETE /announcements/${id}`.

---

## 4. Verification Plan
1. Backend route mounting and syntax validation via server start.
2. Frontend build verification (`npm run build`).
3. Verification of all API endpoints via automated test/smoke scripts.

