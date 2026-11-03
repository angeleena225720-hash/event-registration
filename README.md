# Event Registration System (MERN)

Admins create and manage events; attendees browse events and register.

## Setup
1. Backend: `cd backend && npm install`, copy `.env.example` to `.env` and add your MongoDB Atlas string, then `node server.js`
2. Frontend: `cd frontend && npm install && npm run dev`

## API
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id
- POST /api/events/:id/register
- GET /api/events/:id/registrations
