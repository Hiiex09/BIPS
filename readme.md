# Barangay Information Portal System (BIPS) — Barangay Tejero

A modern, full-stack digital civic services and records management portal for **Barangay Tejero, Cebu City, Philippines**. Built with React 19, Tailwind CSS v4, DaisyUI v5, Node.js/Express, and MongoDB.

---

## 📌 Project Overview

The **Barangay Information Portal System (BIPS)** digitizes and centralizes civic administration for local government units in the Philippines. It eliminates long queues at the barangay hall, modernizes public safety incident reporting, streamlines document issuance, and introduces community story crowdsourcing under official editorial moderation.

Designed with an accessible, high-contrast **Swiss Typography & Civic Modern** visual language (featuring Yves Klein Blue `#002FA7`, 1px hairline borders, and `rounded-xs` geometries).

---

## 🏛️ System Architecture & Roles

The system uses **Role-Based Access Control (RBAC)** across three distinct user roles:

```
[ Public Visitors ] ───► Public Landing, Services, About Us & Leadership, Direct Map Embed
[ Verified Residents ] ─► Resident Dashboard, Document Requests, Incident Filing, Community Stories
[ Staff & Admin ] ──────► Swiss Ledger Dashboard, Document Inbox, Incident Kanban, User CRUD, Story Moderation
```

### 1. Public Visitor (Guest)
* **Civic Landing & Digital Services**: Browse clearance and permit requirements.
* **Official Bulletins**: Filter active municipal advisories and public notices.
* **Leadership Directory**: View Barangay Captain, Secretary, Treasurer, and Health Officer dossiers with professional portraits.
* **Precise Map Integration**: Interactive Google Maps embed with turn-by-turn directions linked directly to `8W25+PGJ, Cebu City, 6000 Cebu`.
* **Flexible Authentication**: Register with ID verification, or log in via **Email**, **Mobile Number**, or one-click **Google Sign-In**.

### 2. Verified Resident Portal (`/Resident`)
* **Executive Resident Dashboard**: Overview of personal permits, health advisories, and local emergency hotlines.
* **Document Requests (`/Resident/documents`)**: Apply online for *Barangay Clearance*, *Certificate of Indigency*, and *Certificate of Residency* with live tracking (`Pending` $\rightarrow$ `Approved` $\rightarrow$ `Ready for Pickup`).
* **Neighborhood Concerns (`/Resident/concerns`)**: Submit infrastructure and safety complaints with description, location, and photos.
* **Community News & Stories (`/Resident/news`)**: Read verified stories or submit community story proposals through the **Submit a Story** workflow with author tracking and withdrawal controls.
* **Health Center & Ordinances (`/Resident/health`, `/Resident/ordinances`)**: Check weekly doctor schedules and local municipal ordinances.

### 3. Barangay Staff & Admin Portal (`/welcome`)
* **Executive Swiss Ledger Dashboard**: High-level live counters for pending requests, open incidents, and population demographics.
* **Document Requests Management (`/document-management`)**: Master-detail inbox to review applicant attachments, approve requests, issue remarks, or mark documents ready for pickup.
* **Incident Reports Workflow Board (`/incident-reports`)**: Interactive 3-column Kanban board (`Open` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`) with status advancement, resolution notes, and deletion.
* **User Directory & Resident CRUD (`/user-management`)**: Full administrator CRUD (Create, Read dossier, Update roles/status, Reset passwords, and Delete records).
* **Public Bulletins & Community Story Moderation (`/announcement-management`)**:
  - **Official Bulletins Tab**: Draft, schedule, and broadcast public advisories.
  - **Resident Story Submissions Tab**: Dedicated moderation queue to inspect resident proposals, publish live to the community feed, or reject with feedback notes.

---

## 🛠️ Technology Stack

### Frontend (`client/`)
* **Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + DaisyUI v5 (Swiss Civic theme, `#002FA7`)
* **Icons**: Lucide React
* **State & Data Fetching**: TanStack React Query v5 + Axios (credentials enabled)
* **Routing**: React Router v7 with route-level code splitting & error boundaries

### Backend (`server/`)
* **Runtime & Framework**: Node.js + Express 5
* **Database & ODM**: MongoDB + Mongoose 9
* **Authentication & Security**:
  - Dual JWT tokens (`access_token` in 15m `httpOnly` cookie + `refresh_token` in 7d cookie)
  - Bcrypt password hashing
  - Multi-identifier login (Email or 11-digit Philippine Mobile Number)
  - Google OAuth profile integration
* **Validation & File Uploads**: Zod v4 schemas + Multer static file storage

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node.js 20 & 24)
* MongoDB running locally on `mongodb://localhost:27017` (or MongoDB Atlas connection string)

### 1. Backend Setup
```bash
cd server
npm install

# Create or verify .env
# PORT=4000
# MONGO_URI=mongodb://localhost:27017/BIPS
# ACCESS_TOKEN=your_jwt_secret_access
# REFRESH_TOKEN=your_jwt_secret_refresh
# NODE_ENV=development

# Start server in dev mode
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install

# Start Vite dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔑 Default Seeded Accounts for Testing

| Role | Email Identifier | Mobile Number | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@barangaytejero.gov.ph` | `09123456789` | `AdminPassword123!` |
| **Staff** | `staff@barangaytejero.gov.ph` | `09123456780` | `StaffPassword123!` |
| **Resident** | `juan.sample@gmail.com` | `09129998877` | `Password123!` |

*(Google Sign-In is also available on `/login` for instant resident access).*

---

## 📂 Git Branching Strategy

The repository follows a progressive release flow:

```
[local]  ──► Active feature development & bug fixes
   │
   ▼
[staging] ──► Integration verification, end-to-end tests
   │
   ▼
[main]    ──► Production-ready release branch
```

To sync branches to remote:
```bash
git push origin local staging main
```

---

## 📄 License
Developed for Barangay Tejero, Cebu City for public service digitalization and educational demonstration.
