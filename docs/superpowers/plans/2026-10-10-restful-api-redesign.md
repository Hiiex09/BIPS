# RESTful API Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor all backend endpoints and client API callers into clean, meaningful RESTful API conventions without legacy verb prefixes or broken pluralization.

**Architecture:** Update route definitions and controllers in Express (`server/src/routes/*`, `server/src/index.js`), update API caller methods in React (`client/src/api/*`), verify with both automated route tests and Vite client production build.

**Tech Stack:** Express.js, Node.js, Axios, React 19, Vite.

**Spec:** [`docs/superpowers/specs/2026-10-10-restful-api-redesign.md`](file:///c:/Users/Devon/Desktop/PROJECTS/BIPS/docs/superpowers/specs/2026-10-10-restful-api-redesign.md)

## Global Constraints
- Clean REST conventions: Plural nouns for collections (`/announcements`, `/certificates`, `/users`, `/incidents`, `/stories`).
- HTTP Verbs: `GET` for retrieval, `POST` for creation, `PATCH` for partial update, `DELETE` for removal.
- Sub-resource and action patterns: `/certificates/:id/approve`, `/certificates/:id/ready`, `/certificates/:id/reject`, `/stories/:id/status`.
- User-scoped resources: `/certificates/me`, `/incidents/me`, `/stories/me`, `/auth/me`, `/users/profile`.
- Analytics endpoints: `/users/stats/residents`, `/users/stats/certificates`, `/users/stats/announcements`.

## Review Focus
- Un-migrated frontend call: Direct calls in components (e.g., `AnnouncementsManagement.jsx`) must point to `/announcements/:id`.
- Base URL mounting: `server/src/index.js` must mount `/api/v1/announcements` and `/api/v1/certificates` (plural).
- Role access guards: Ensure `protectRoute` and `authorizedRoles` remain strictly intact on all refactored routes.
- Client contract stability: Ensure response payloads returned to UI hooks remain consistent.

---

### Task 1: Refactor Announcements API (Backend & Client)

**Files:**
- Modify: `server/src/routes/announcement_route.js`
- Modify: `server/src/index.js`
- Modify: `client/src/api/announcement_api.js`
- Modify: `client/src/pages/AdminUI/pages/AnnouncementsManagement.jsx`

- [ ] **Step 1: Update `server/src/routes/announcement_route.js` to RESTful endpoints**
  - Replace `POST /create-announcement` with `POST /`
  - Replace `GET /get-announcement` with `GET /`
  - Replace `PATCH /update-announcement/:id` with `PATCH /:id`
  - Replace `DELETE /delete-announcement/:id` with `DELETE /:id`

- [ ] **Step 2: Update route mounting in `server/src/index.js`**
  - Mount at `/api/v1/announcements` instead of `/api/v1/announcement`

- [ ] **Step 3: Update `client/src/api/announcement_api.js` and `AnnouncementsManagement.jsx`**
  - `createAnnouncementApi` -> `POST /announcements`
  - `getAnnouncementApi` -> `GET /announcements`
  - `AnnouncementsManagement.jsx` delete call -> `DELETE /announcements/${id}`

- [ ] **Step 4: Verify build and test endpoints**
  - Run client build to verify no broken imports.

- [ ] **Step 5: Commit changes**
  - `git commit -m "refactor(api): convert announcements endpoints to RESTful convention"`

---

### Task 2: Refactor Certificates API (Backend & Client)

**Files:**
- Modify: `server/src/routes/cert_request_route.js`
- Modify: `server/src/index.js`
- Modify: `client/src/api/certificate_api.js`

- [ ] **Step 1: Update `server/src/routes/cert_request_route.js`**
  - Replace `POST /certificate` with `POST /`
  - Replace `GET /my-requests` with `GET /me`
  - Replace `GET /requests` with `GET /`
  - Replace `PATCH /request/:id/approve` with `PATCH /:id/approve`
  - Replace `PATCH /request/:id/ready` with `PATCH /:id/ready`
  - Replace `PATCH /request/:id/reject` with `PATCH /:id/reject`

- [ ] **Step 2: Update route mounting in `server/src/index.js`**
  - Mount at `/api/v1/certificates` instead of `/api/v1/certificate`

- [ ] **Step 3: Update `client/src/api/certificate_api.js`**
  - `createCertificateRequestApi` -> `POST /certificates`
  - `getMyCertificateRequestsApi` -> `GET /certificates/me`
  - `getCertificateRequestsApi` -> `GET /certificates`
  - `approveCertificateRequestApi` -> `PATCH /certificates/${id}/approve`
  - `readyCertificateRequestApi` -> `PATCH /certificates/${id}/ready`
  - `rejectCertificateRequestApi` -> `PATCH /certificates/${id}/reject`

- [ ] **Step 4: Commit changes**
  - `git commit -m "refactor(api): convert certificates endpoints to RESTful convention"`

---

### Task 3: Refactor Authentication & Users API (Backend & Client)

**Files:**
- Modify: `server/src/routes/auth_routes.js`
- Modify: `server/src/routes/user_routes.js`
- Modify: `client/src/api/auth_api.js`
- Modify: `client/src/api/user_api.js`

- [ ] **Step 1: Update `server/src/routes/auth_routes.js`**
  - Replace `GET /checkAuth` with `GET /me`

- [ ] **Step 2: Update `server/src/routes/user_routes.js`**
  - Replace `GET /resident` with `GET /profile`
  - Replace `GET /admin/list` with `GET /`
  - Replace `POST /admin/create` with `POST /`
  - Replace `PATCH /admin/:id` with `PATCH /:id`
  - Replace `DELETE /admin/:id` with `DELETE /:id`
  - Replace `GET /admin` with `GET /stats/residents`
  - Replace `GET /admin/total` with `GET /stats/certificates`
  - Replace `GET /total/announcement` with `GET /stats/announcements`

- [ ] **Step 3: Update `client/src/api/auth_api.js` and `client/src/api/user_api.js`**
  - `checkAuth` -> `GET /auth/me`
  - `getUserInfo` -> `GET /users/profile`
  - `getUsersListApi` -> `GET /users`
  - `createUserApi` -> `POST /users`
  - `updateUserApi` -> `PATCH /users/${id}`
  - `deleteUserApi` -> `DELETE /users/${id}`
  - `countAllResident` -> `GET /users/stats/residents`

- [ ] **Step 4: Commit changes**
  - `git commit -m "refactor(api): convert auth and user management endpoints to RESTful convention"`

---

### Task 4: Refactor Incidents & Community Stories API (Backend & Client)

**Files:**
- Modify: `server/src/routes/incident_route.js`
- Modify: `server/src/routes/story_route.js`
- Modify: `client/src/api/incident_api.js`
- Modify: `client/src/api/story_api.js`

- [ ] **Step 1: Update `server/src/routes/incident_route.js`**
  - Replace `GET /my-incidents` with `GET /me`

- [ ] **Step 2: Update `server/src/routes/story_route.js`**
  - Replace `GET /published` with `GET /`
  - Replace `GET /my-stories` with `GET /me`
  - Replace `GET /admin/all` with `GET /moderation`
  - Replace `PATCH /admin/:id/status` with `PATCH /:id/status`
  - Replace `DELETE /admin/:id` with `DELETE /moderation/:id`

- [ ] **Step 3: Update `client/src/api/incident_api.js` and `client/src/api/story_api.js`**
  - `getMyIncidentsApi` -> `GET /incidents/me`
  - `getPublishedStoriesApi` -> `GET /stories`
  - `getMyStoriesApi` -> `GET /stories/me`
  - `getAllStoriesAdminApi` -> `GET /stories/moderation`
  - `updateStoryStatusApi` -> `PATCH /stories/${id}/status`
  - `deleteStoryAdminApi` -> `DELETE /stories/moderation/${id}`

- [ ] **Step 4: Commit changes**
  - `git commit -m "refactor(api): convert incident and story routes to RESTful convention"`

---

### Task 5: End-to-End Verification & Pipeline Sync

**Files:**
- Verify: Full client compilation (`npm run build`)
- Sync: `local` -> `staging` -> `main`

- [ ] **Step 1: Run client build verification**
  - Run `npm run build` in `client` to ensure zero compilation or route errors.

- [ ] **Step 2: Run smoke verification test on server route definitions**
  - Verify server compiles and starts properly with Express route tables.

- [ ] **Step 3: Push changes across branching pipeline**
  - Push commit on `local`.
  - Push `local:staging`.
  - Push `local:main`.

