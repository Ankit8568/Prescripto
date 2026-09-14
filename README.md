# 🩺 Prescripto — Doctor Appointment Booking System

Prescripto is a full-stack healthcare appointment platform that connects patients with doctors, letting patients discover doctors by specialty, book time slots, and pay online — while giving doctors and admins the tools to manage appointments, availability, and profiles from dedicated dashboards.

---

## 📌 Problem Statement

Booking a doctor's appointment offline is still a slow, manual process in most clinics:

- Patients have to call or visit in person just to check a doctor's availability.
- There's no single place to compare doctors by specialty, experience, or fees.
- Clinics manage appointments on paper or spreadsheets, leading to double bookings and no-shows.
- Doctors have no easy way to update their availability or track their own schedule.
- Payments are handled manually, with no digital trail.

## 💡 Solution

Prescripto solves this with a three-panel web application:

| Panel | Who it's for | What it does |
|---|---|---|
| **Frontend** | Patients | Browse doctors by speciality, view profiles, book/cancel appointments, pay online, manage their own profile and appointment history |
| **Admin Panel** | Clinic Admin | Add/manage doctors, view all appointments, cancel appointments, see dashboard stats |
| **Doctor Panel** | Doctors | Log in to view their own appointments, mark them complete/cancelled, toggle availability, update profile |

The result: doctors publish real-time availability, patients book instantly, and admins get a live operational view — removing the manual back-and-forth entirely.

---

## ✨ Features

- 🔐 **Authentication** — JWT-based auth for Patients, Doctors, and Admin (separate login flows)
- 🔎 **Doctor Discovery** — filter/browse doctors by speciality
- 📅 **Appointment Booking** — real-time slot booking with slot-conflict handling (`slots_booked`)
- 💳 **Online Payments** — Razorpay integration for paying consultation fees
- 🖼️ **Image Uploads** — doctor/patient profile images via Multer + Cloudinary
- 👨‍⚕️ **Doctor Dashboard** — appointments list, earnings/appointment stats, availability toggle
- 🛠️ **Admin Dashboard** — add doctors, manage all appointments, platform-wide stats
- 📱 **Responsive UI** — built with React + Tailwind CSS across both patient and admin apps

---

## 🏗️ Tech Stack

**Frontend & Admin Panel**
- React 18 (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify / React Hot Toast

**Backend**
- Node.js + Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- Razorpay for payments

**Architecture**

```
Prescripto/
├── frontend/     # Patient-facing React app (Vite)
├── admin/        # Admin + Doctor dashboard React app (Vite)
└── backend/      # Express REST API + MongoDB
```

This is a **MERN stack** monorepo with the frontend split into two independent apps (patient vs. admin/doctor) sharing one backend API.

---

## 📂 Project Structure

```
Prescripto-main/
├── backend/
│   ├── config/          # DB & Cloudinary connection setup
│   ├── controllers/     # adminController, doctorController, userController
│   ├── middlewares/     # authAdmin, authDoctor, authUser, multer
│   ├── models/          # appointmentModel, doctorModel, userModel
│   ├── routes/          # adminRoute, doctorRoute, userRoute
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Banner, Footer, SpecialityMenu, TopDoctors...
│   │   └── pages/       # Home, Doctors, Appointment, MyAppointments, MyProfile...
└── admin/
    └── src/             # Admin & Doctor dashboard views
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or a MongoDB Atlas cluster)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [Razorpay](https://razorpay.com/) account (for online payments)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Prescripto.git
cd Prescripto
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run the backend:

```bash
npm run dev     # starts with nodemon on http://localhost:4000
```

### 3. Frontend Setup (Patient App)

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the frontend:

```bash
npm run dev      # starts on http://localhost:5173
```

### 4. Admin Panel Setup

```bash
cd admin
npm install
```

Create a `.env` file inside `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the admin panel:

```bash
npm run dev      # starts on http://localhost:5174 (or next available port)
```

> ⚠️ **Security note:** Never commit your real `.env` files to GitHub. Add `.env` to `.gitignore` in all three folders and rotate any credentials that may have been previously exposed (MongoDB URI, Cloudinary keys, JWT secret, admin password).

---

## 🔌 API Overview

All routes are prefixed with `/api`.

| Base Route | Description |
|---|---|
| `POST /api/user/register` | Register a new patient |
| `POST /api/user/login` | Patient login |
| `GET /api/user/get-profile` | Get logged-in patient's profile |
| `POST /api/user/update` | Update patient profile (with image) |
| `POST /api/user/book-appointment` | Book an appointment |
| `GET /api/user/appointments` | List patient's appointments |
| `POST /api/user/cancel` | Cancel an appointment |
| `POST /api/user/pay-online` | Pay for an appointment via Razorpay |
| `GET /api/doctor/list` | Public list of all doctors |
| `POST /api/doctor/login` | Doctor login |
| `GET /api/doctor/appointments` | Doctor's own appointments |
| `POST /api/doctor/complete-appointment` | Mark appointment as completed |
| `POST /api/doctor/cancel-appointment` | Doctor cancels an appointment |
| `GET /api/doctor/dashboard` | Doctor dashboard stats |
| `POST /api/admin/login` | Admin login |
| `POST /api/admin/add-doctor` | Add a new doctor (with image) |
| `POST /api/admin/all-doctors` | List all doctors |
| `POST /api/admin/change-availability` | Toggle a doctor's availability |
| `GET /api/admin/appointments` | All appointments (admin view) |
| `POST /api/admin/cancel-appointment` | Admin cancels an appointment |
| `GET /api/admin/dashboard` | Admin dashboard stats |

Protected routes use JWT-based middleware (`authUser`, `authDoctor`, `authAdmin`) passed via request headers/tokens.

---

## 🚀 Future Scope

- Video/audio consultation integration
- SMS/Email appointment reminders
- Ratings & reviews for doctors
- Prescription generation & download
- Multi-language support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — feel free to use it for learning or as a base for your own project.

## 👤 Author

**Ankit**
- GitHub: [@Ankit8568](https://github.com/Ankit8568)
- LinkedIn: [Ankit Kanojiya](https://linkedin.com/in/ankit-kanojiya-71b161271)

---

⭐️ If you found this project useful, consider giving it a star on GitHub!
