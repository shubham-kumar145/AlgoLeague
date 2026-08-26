# 🧠 AlgoLeague — Online Coding Platform

<div align="center">

### 🚀 Practice • Solve • Submit • Improve

A full-stack online coding platform designed to simulate real-world competitive programming and technical interview environments.

**Solve coding problems • Execute code • Track submissions • Analyze performance**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-AlgoLeague-brightgreen?style=for-the-badge)](https://algoleague.vercel.app/)
[![GitHub](https://img.shields.io/badge/💻%20GitHub-Repository-black?style=for-the-badge\&logo=github)](https://github.com/shubham-kumar145/AlgoLeague)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Cache-Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)](https://redis.io/)

</div>

---

## 📌 Overview

**AlgoLeague** is a full-stack online coding platform built for programmers to practice coding problems, execute solutions in real time, and track their submission history.

The platform supports **C++, Java, and JavaScript**, with code execution powered by **Judge0**.

The project focuses not only on building a functional coding platform, but also on implementing concepts used in production systems such as:

* 🔐 Secure authentication and authorization
* 👥 Role-Based Access Control
* ⚡ Redis-based caching and session management
* 🧪 Automated code evaluation
* 📊 Submission analytics
* 🚀 Scalable backend architecture
* 🔄 Third-party API integration

---

# 🎥 Project Demo

https://github.com/user-attachments/assets/dabbd723-8eaf-43b5-ba4e-554ebff09117

▶️ **[Watch the complete project walkthrough](https://youtu.be/pW7WXC7o28c)**

---

# 🌐 Live Demo

🚀 **https://algoleague.vercel.app/**

> The live platform allows users to explore problems, write code, execute solutions, and view submission results.

---

# ✨ Features

## 👨‍💻 User Features

* 🧩 Browse and solve coding problems
* 💻 Interactive online code editor
* ⚡ Execute code in real time
* 🌐 Support for multiple programming languages

  * C++
  * Java
  * JavaScript
* 🧪 Visible and hidden test cases
* 📜 Complete submission history
* 📊 Detailed execution results
* ⏱️ Runtime analysis
* 💾 Memory usage tracking
* 🏷️ Problem filtering by difficulty and tags
* 🌙 Responsive dark-themed interface

---

# 🛡️ Admin Features

AlgoLeague includes a dedicated administration workflow for managing the coding platform.

### Problem Management

* ➕ Create problems
* ✏️ Update problems
* 🗑️ Delete problems
* 🏷️ Manage problem tags
* 🧪 Configure visible and hidden test cases

### Platform Analytics

Administrators can monitor:

* 📈 Acceptance rates
* 👥 User attempts
* 📊 Problem performance
* 📝 Submission activity

### Access Control

Admin and user workflows are separated using **Role-Based Access Control (RBAC)**.

---

# ⚙️ System Architecture

The application follows a modern full-stack architecture:

```text
                    ┌─────────────────────┐
                    │       Client        │
                    │   React + Tailwind  │
                    └──────────┬──────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │   Node.js + Express │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └─────────────┐
              ▼                                  ▼
     ┌─────────────────┐                ┌─────────────────┐
     │     MongoDB     │                │      Redis      │
     │ Persistent Data │                │ Cache / Session │
     └─────────────────┘                └─────────────────┘
                           │
                           │ Code Submission
                           ▼
                    ┌─────────────────────┐
                    │       Judge0        │
                    │ Code Execution API  │
                    └─────────────────────┘
```

---

# 🧰 Tech Stack

| Layer                 | Technology             |
| --------------------- | ---------------------- |
| **Frontend**          | React                  |
| **Styling**           | Tailwind CSS           |
| **Backend**           | Node.js, Express.js    |
| **Database**          | MongoDB, Mongoose      |
| **Caching**           | Redis                  |
| **Authentication**    | JWT, HTTP-only Cookies |
| **Sessions**          | Redis                  |
| **Code Execution**    | Judge0 API             |
| **API Communication** | REST APIs              |

---

# 🔐 Authentication & Security

Security was an important part of the system design.

### Authentication

* JWT-based authentication
* HTTP-only cookies
* Token validation
* Protected API routes
* Session expiration

### Authorization

The platform implements **Role-Based Access Control (RBAC)**:

```text
User
 ├── Solve Problems
 ├── Run Code
 ├── Submit Solutions
 └── View Submission History

Admin
 ├── Manage Problems
 ├── Manage Test Cases
 ├── Manage Users
 └── View Platform Analytics
```

### Session Management

Redis is used to manage session-related data and expiration, providing fast access while reducing unnecessary database operations.

---

# 🧪 Online Judge & Code Execution

One of the core components of AlgoLeague is its **online code evaluation system**.

The platform integrates the **Judge0 API** to execute user-submitted code.

### Submission Flow

```text
User writes code
       │
       ▼
Select language
       │
       ▼
Submit solution
       │
       ▼
Backend validates request
       │
       ▼
Send code to Judge0
       │
       ▼
Judge0 compiles & executes
       │
       ▼
Receive execution result
       │
       ▼
Evaluate test cases
       │
       ▼
Store submission
       │
       ▼
Return result to user
```

The system can provide:

* ✅ Accepted / rejected status
* ❌ Failed test cases
* ⏱️ Execution time
* 💾 Memory usage
* 🧪 Individual testcase results
* ⚠️ Compilation and runtime errors

---

# ⚡ Redis & Performance

Redis is used for performance-sensitive operations such as:

* Session management
* Session expiration
* Frequently accessed data
* Reducing repeated database queries

The goal is to keep frequently accessed information in a low-latency cache layer while maintaining MongoDB as the persistent data store.

---

# 📊 Submission & Analytics

Every submission can be tracked with useful execution information.

### User Analytics

Users can view:

* Submission history
* Problem-wise submissions
* Accepted / rejected results
* Runtime
* Memory consumption
* Testcase results

### Admin Analytics

Administrators can analyze:

* Problem acceptance rates
* Number of attempts
* Submission activity
* Problem performance

---

# 🎨 UI / UX

The frontend focuses on creating a coding environment that feels familiar to users of modern competitive programming platforms.

### Highlights

* 🌙 Dark-themed interface
* 💻 Interactive coding workspace
* 📱 Responsive design
* 🧭 Smooth navigation
* 🧩 Problem filtering
* 📜 Submission history
* 📊 Admin dashboard
* ⚡ Fast user interactions

---

# 🗂️ Core Modules

```text
AlgoLeague
│
├── Authentication
│   ├── JWT Authentication
│   ├── Cookie Management
│   └── Session Handling
│
├── User System
│   ├── Problem Solving
│   ├── Code Execution
│   └── Submission History
│
├── Online Judge
│   ├── Code Submission
│   ├── Judge0 Integration
│   ├── Testcase Evaluation
│   └── Result Processing
│
├── Admin System
│   ├── Problem Management
│   ├── Testcase Management
│   ├── User Management
│   └── Analytics
│
└── Performance Layer
    ├── Redis Cache
    └── Redis Sessions
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Redis
* Judge0 API access

---

## 1. Clone the Repository

```bash
git clone https://github.com/shubham-kumar145/AlgoLeague.git

cd AlgoLeague
```

---

## 2. Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_URL=your_redis_url
JUDGE0_API_KEY=your_judge0_api_key
```

> Never commit your `.env` file or expose API keys and secrets publicly.

---

## 4. Run the Backend

```bash
cd backend
npm run dev
```

---

## 5. Run the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The application will then be available through the local development URL shown by Vite.

---

# 🔮 Future Enhancements

The platform can be extended with several features:

* 🏆 **Contest Mode**

  * Timed contests
  * Live leaderboards
  * Ranking system

* 💬 **Discussion System**

  * Problem discussions
  * Comments
  * Community solutions

* 📊 **Advanced User Analytics**

  * Skill tracking
  * Problem-solving statistics
  * Performance trends

* 🕵️ **Code Plagiarism Detection**

  * Similarity detection
  * Suspicious submission analysis

* 📚 **Editorial System**

  * Official solutions
  * Explanations
  * Complexity analysis

* 🔔 **Real-Time Notifications**

  * Submission updates
  * Contest notifications
  * Platform announcements

---

# 🧠 Engineering Learnings

Building AlgoLeague provided hands-on experience with several real-world engineering concepts:

### Full-Stack Engineering

Designed and connected the complete application stack from the React frontend to backend APIs, database, cache, and external code execution service.

### Backend Architecture

Built REST APIs using Node.js and Express with authentication, authorization, validation, database operations, and submission processing.

### Distributed Components

Worked with multiple independent services:

```text
Frontend
   ↓
Backend
   ↓
MongoDB
   ↓
Redis
   ↓
Judge0
```

### Performance Optimization

Used Redis to reduce latency and minimize unnecessary database operations for frequently accessed data and session-related workloads.

### Security

Implemented authentication, protected routes, cookie-based token handling, session expiration, and RBAC.

### External API Integration

Integrated Judge0 into the submission pipeline to provide multi-language code execution.

---

# 📈 Project Focus

AlgoLeague was built with a focus on:

**Scalability • Security • Performance • Reliability • Maintainability**

Rather than treating the project as only a CRUD application, the architecture was designed around problems that appear in real-world developer platforms — authentication, concurrent submissions, code execution, caching, authorization, and external service integration.

---

# 👨‍💻 Author

## Shubham Kumar

**Full-Stack Developer • Competitive Programmer • Open Source Contributor**

* 🌐 Portfolio: https://shubhamkumar.me
* 💻 GitHub:    https://github.com/shubham-kumar145
* 💼 LinkedIn:  https://www.linkedin.com/in/shubham-kumar145/
* ▶️ YouTube:   https://www.youtube.com/@ShubhamKumar-145

---

# ⭐ Support

If you found **AlgoLeague** interesting, consider giving the repository a ⭐.

Feedback, suggestions, and contributions are welcome.

---

<div align="center">

### 🚀 AlgoLeague

**Practice. Solve. Improve.**

Built with ❤️ by **Shubham Kumar**

</div>
