# 🚀 SkillSphere

SkillSphere is a full-stack MERN freelance marketplace that connects **clients** and **freelancers**. Clients can post projects, while freelancers can browse opportunities and apply for work. The project is being developed in phases with a scalable backend architecture.

---

## ✨ Current Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization (Client, Freelancer, Admin)
- Password Hashing using bcrypt

### 👤 User Management
- Get Profile
- Update Profile
- Change Password
- Delete Account

### 💼 Gig Management
- Create Gig (Client Only)
- Get All Gigs
- Get Single Gig
- Update Gig (Owner Only)

---

## 🚧 Features Under Development

- Delete Gig
- Search Gigs
- Category Filter
- Budget Filter
- Pagination
- Proposal System
- Freelancer Dashboard
- Client Dashboard
- Real-time Chat
- Notifications
- Reviews & Ratings
- Admin Dashboard

---

# 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

### Frontend (Coming Soon)
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

---

# 📁 Project Structure

```text
SkillSphere
│
├── client
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env.example
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/deepakpandit31/SkillSphere.git
```

## Navigate to the project

```bash
cd SkillSphere/server
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start the server

```bash
npm run dev
```

The server will run at:

```
http://localhost:5000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get Profile |
| PUT | `/api/users/profile` | Update Profile |
| PUT | `/api/users/change-password` | Change Password |
| DELETE | `/api/users/delete-account` | Delete Account |

### Gigs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/gigs/create` | Create Gig |
| GET | `/api/gigs` | Get All Gigs |
| GET | `/api/gigs/:id` | Get Single Gig |
| PUT | `/api/gigs/:id` | Update Gig |

---

# 📅 Development Progress

## ✅ Completed
- Authentication Module
- User Management Module
- Gig CRUD (Create, Read, Update)

## 🚧 In Progress
- Delete Gig
- Search & Filters
- Pagination

## 📌 Planned
- Proposal System
- Dashboards
- Chat
- Notifications
- Reviews
- Payment Integration

---

# 🚀 Future Improvements

- AI-powered Skill Matching
- AI Proposal Generator
- Resume Builder
- Admin Analytics
- Mobile Responsive UI
- Deployment

---

# 👨‍💻 Author

**Deepak Sikhwal**

- GitHub: https://github.com/deepakpandit31
- LinkedIn: https://linkedin.com/in/deepak-sikhwal-67a976287

---

⭐ If you found this project interesting, consider giving it a star.