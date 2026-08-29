# Fixed Task Manager

## Stack
- React 18 + React Router + Axios
- Express + MongoDB/Mongoose
- JWT authentication
- Socket.IO

## 1. Start MongoDB
Use local MongoDB:
`mongodb://127.0.0.1:27017/taskmanager`

Or replace `MONGODB_URI` in `backend/.env` with your MongoDB Atlas URI.

## 2. Backend
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend: http://localhost:5000
Health check: http://localhost:5000/api/health

## 3. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:3000

The React proxy sends `/api/*` requests to port 5000, so Axios does not need a hard-coded backend URL.

## Connection flow
React -> Axios `/api` -> CRA proxy -> Express -> JWT middleware -> MongoDB.
Socket.IO connects to the same backend and refreshes tasks after task changes.
