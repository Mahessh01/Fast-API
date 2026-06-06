TechKraft Recruitment Dashboard (Task000)

A full-stack recruitment management system built as part of the TechKraft Full Stack Engineer Take-Home Assignment.

This project enables recruiters to manage candidate data with authentication, protected APIs, and full CRUD functionality.

#Features
User Authentication (JWT-based)
Secure password hashing (bcrypt)
Candidate Management (CRUD)
Protected API routes
React-based dashboard UI
Persistent login using LocalStorage
Auto-generated API docs (Swagger UI)
🛠 Tech Stack
Backend
FastAPI (Python)
SQLite (Database)
JWT Authentication (python-jose)
Password hashing (passlib[bcrypt])
Uvicorn (ASGI server)
Frontend
React (Vite)
JavaScript (ES6+)
React Router DOM
Fetch API

#Project Structure
TechKraft-Recruitment-Dashboard/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── models.py
│   │   ├── routers/
│   │   └── database.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   ├── package.json
│
└── README.md

#How to Run the Project
#Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs

#Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

#Authentication Flow
User registers → POST /auth/register
User logs in → POST /auth/login
Backend returns JWT token:
{
  "access_token": "token_here",
  "token_type": "bearer"
}
Token is stored in LocalStorage
Token is sent in API requests:
Authorization: Bearer <token>


#API Endpoints
#Auth Routes
POST /auth/register → Register user
POST /auth/login → Login user


#Candidate Routes
GET /candidates/all → Get all candidates
POST /candidates/ → Create candidate (Protected)
GET /candidates/{id} → Get candidate by ID
PUT /candidates/{id} → Update candidate (Protected)
DELETE /candidates/{id} → Delete candidate (Protected)

#Security Features
JWT-based authentication
Password hashing using bcrypt
Protected API routes
Unauthorized requests return 401 Unauthorized


#Architecture Decisions (ADR)
ADR 1: JWT Authentication

Used for stateless authentication to avoid server-side session storage and improve scalability.

ADR 2: FastAPI Backend

Chosen for its high performance, async support, and automatic Swagger documentation.

ADR 3: React Frontend with Hooks

Functional components with hooks were used for simplicity and modern state management.


#Debugging Notes
Fixed CORS blocking → added FastAPI middleware
Fixed 401 errors → attached JWT token in headers
Fixed React Router issues → wrapped app in BrowserRouter
Fixed localStorage token issues → corrected login response handling
#Final Status
✔ Backend complete
✔ Frontend complete
✔ Authentication working
✔ CRUD operations working
✔ Protected routes working


#Learning Outcome

This project helped in understanding:

Full-stack authentication flow
JWT-based security implementation
React ↔ FastAPI integration
REST API design
Real-world debugging and deployment readiness