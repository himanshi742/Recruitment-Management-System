# Recruitment-Management-System

Recruitment Management System

## Overview

The Recruitment Management System is a full-stack web application built using the MERN stack. It streamlines the hiring workflow by enabling organizations to post jobs, manage applications, and assist
candidates in upskilling through resume creation and certification links. The platform supports multi-role authentication (Admin, Recruiter, Candidate) and includes features such as a secure login system,
resume builder, and integrated payment functionality.

## Features

🌐 Job Listings
Post and browse international and national jobs.

👤 User Roles
Admin, Recruiter, and Candidate roles with specific functionalities.

📝 Resume Builder
In-app resume creation for candidates.

🎓 Certification Assistance
Provide various certificates for different courses.

🔐 JWT Authentication
Secure login system for different user types.

💼 Application Management
Track, shortlist, and manage job applications.

💳 Payment Gateway
Paid job posting and access to premium features.

Tech Stack (MERN)
🧩 Frontend
React.js – UI library for interactive user interfaces.

Redux (optional) – State management.

Axios – API calls to the backend.

HTML/CSS/Bootstrap/Tailwind – Styling and layout.

## Backend

Node.js – JavaScript runtime for server-side logic.

Express.js – Web framework for building APIs and handling routes.

MongoDB – NoSQL database for storing users, jobs, and applications.

Mongoose – ODM for MongoDB.

JWT – Token-based authentication for secure sessions.

Stripe/PayPal – (Optional) Payment processing.

## Installation

🧾 Prerequisites
Node.js & npm
MongoDB (local or MongoDB Atlas)
Git

📦 Backend Setup

## Clone the repository

```bash
git clone https://github.com/your-username/recruitment-management-system.git
cd recruitment-management-system/server
```

## Install backend dependencies

```bash
npm install
```

## Create and configure the .env file

```bash
touch .env
Add the following to .env:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

# Run the backend server

```bash
npm start
🖥️ Frontend Setup
cd ../client
```

```bash
# Install frontend dependencies
npm install
```

# Start the frontend server

npm start
Visit the frontend at: http://localhost:3000

## Usage

Candidates: Register, build resumes, search & apply for jobs, explore certifications.
Recruiters: Post jobs, view applicants, shortlist candidates.
Admin: Oversee all activities, manage users, moderate content.

## Future Enhancements

Real-time chat between recruiters and candidates
Admin analytics dashboard
Skill-based candidate recommendations
Automated resume parsing
Scheduling interviews with calendar integration

## Contributing

Fork the repository.
Create a new branch: git checkout -b feature-branch
Make changes and commit: git commit -m "Add feature"
Push to the branch: git push origin feature-branch
Open a Pull Request
