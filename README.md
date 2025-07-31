# Yoga Session Manager

A simple MERN stack project to manage sessions with login, draft save, publish, and edit features.

## Project Structure

Yoga/
├── Backend/
├── Frontend/

## Setup Instructions

### Backend

- Go to `Backend/`
- Install packages: `npm install`
- Make `.env` file:

MONGO_URI=mongodb+srv://alqama:alqama123@cluster0.xmseg.mongodb.net/yoga-mat

JWT_SECRET=secret

PORT=5000

- Run backend: `nodemon server.js`

### Frontend

- Go to `Frontend/`
- Install packages: `npm install`
- Run frontend: `npm run dev`

**Frontend:** `http://localhost:5173`  
**Backend:** `http://localhost:5000`

#API ROUTES


## API Routes

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|--------------|
| POST | /auth/register | { email, password } | Register user |
| POST | /auth/login | { email, password } | Login user, get JWT |

### Sessions

| Method | Endpoint | Body | Description |
|--------|----------|------|--------------|
| GET | /sessions | - | Get all published sessions |
| GET | /my-sessions | - | Get your sessions |
| GET | /my-sessions/:id | - | Get session by ID |
| POST | /my-sessions/save-draft | { id?, title, tags[], json_file_url } | Save/update draft |
| POST | /my-sessions/publish | { id } | Publish session |
| DELETE | /my-sessions/:id | - | Delete session |

**Authorization:**  
Pass JWT in header:


#FRONTEND ROUTES

## Frontend Pages

| URL | Description |
|-----|--------------|
| /login | Login page |
| /register | Register page |
| /dashboard | View published sessions |
| /my-sessions | Manage your sessions |
| /editor | Create new session |
| /editor/:id | Edit session |



## Author

Created by [Md Alqama ](https://github.com/Alqamabackend/yoga.git)
