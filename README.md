# 🎓 SmartEnroll System

![SmartEnroll Banner](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![Version](https://img.shields.io/badge/Version-1.0.0-orange)

**The Next Generation of University Course Registration.**

SmartEnroll System is a modern, full-stack web application designed to streamline the complex process of academic course registration. It connects students, faculty, and administrators through insightful dashboards, real-time scheduling, and automated conflict detection.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- **Role-Based Access**: Specialized portals for **Students**, **Faculty**, and **Admins**.
- **Secure Handling**: JWT-based sessions and Bcrypt password hashing.
- **Open Registration**: Easy sign-up for all roles (including Admin) for testing purposes.
- **Mixed Content**: Hardcoded test credentials available on the login page for quick access.

### 🎓 For Students
- **Smart Course Search**: Filter courses by department, instructor, or time.
- **One-Click Enrollment**: Instant registration with immediate capacity checks.
- **Automated Waitlists**: Join waitlists for full sections and get auto-promoted when spots open.
- **Visual Timetable**: Color-coded weekly schedule view to visualize your semester.
- **Conflict Detection**: The system prevents you from booking conflicting classes.

### 👨‍🏫 For Faculty
- **Live Rosters**: View up-to-date lists of students enrolled in your sections.
- **Teaching Schedule**: A clear view of your assigned classes and times.
- **Capacity Monitoring**: Track enrollment numbers against section limits.

### 🛡️ For Administrators
- **Full Control**: Create and manage Courses, Sections, Rooms, and Terms.
- **User Management**: Oversee student and faculty accounts.
- **System Analytics**: View high-level stats on enrollment and waitlists.

---

## 💻 Tech Stack

### Client-Side (Frontend)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State & Data**: [Axios](https://axios-http.com/) & [React Query](https://tanstack.com/query/latest) (implied)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Server-Side (Backend)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT & Bcrypt

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (Local installation or Supabase cloud instance)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Uday-Choudhary/SmartEnroll-System.git
cd SmartEnroll-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Configuration (.env)**
Create a `.env` file in the `backend` directory:
```env
# Database Connection (Supabase Transaction Mode or Local)
DATABASE_URL="postgres://user:pass@host:6543/db?pgbouncer=true"

# Direct Connection (Supabase Session Mode - Required for Migrations)
DIRECT_URL="postgres://user:pass@host:5432/db"

# Security
JWT_SECRET="super-secret-key-change-me"

# Server
PORT=4000
NODE_ENV=development
```

**Database Initialization**
```bash
# Push schema to database
npx prisma migrate dev --name init

# Seed initial data (Roles, Admin, etc.)
node prisma/seed.js
```

**Start Server**
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal.
```bash
cd frontend
npm install
```

**Configuration (.env)**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:4000
```

**Start Client**
```bash
npm run dev
```

The application will launch at `http://localhost:5173`.

---

## 🧪 Testing & Usage

We've made testing easy. Go to the **Login Page** and you will see a list of pre-configured test accounts for every role:

| Room | Email | Password |
|------|-------|----------|
| **Admin** | `admin@smartenroll.com` | `Password@123` |
| **Faculty** | `rajesh.sharma@smartenroll.com` | `Password@123` |
| **Student** | `aarav.patel@student.smartenroll.com` | `Password@123` |

You can also **Register** a new account. Select "Admin", "Faculty", or "Student" from the dropdown during sign-up.

---

## 📦 Deployment

This project is ready for deployment.
- **Database**: Supabase
- **Backend**: Render / Railway
- **Frontend**: Vercel / Netlify

👉 **[Read the Full Deployment Guide](DEPLOYMENT.md)** for step-by-step instructions.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
