
# BYOB Blogging Platform

Build Your Own Blog (BYOB) is a full-stack blogging platform that enables users to create, publish, and manage blog posts with a modern, interactive UI. The project is divided into a React-based frontend and a Node.js/Express backend, with MongoDB for data storage and AWS S3 for image uploads.

## Features

- User authentication (email/password & Google OAuth)
- Rich text blog editor (Editor.js)
- Image uploads via AWS S3
- Responsive, modern UI with Tailwind CSS
- User profiles, dashboard, and trending blogs
- Secure password hashing (bcrypt)
- JWT-based session management
- MongoDB data models for users, blogs, comments, and notifications

## Project Structure

byob-blogging-website/ ├── byob-frontend/ # React frontend (Vite, Tailwind, Editor.js) │ ├── src/ │ ├── index.html │ └── package.json ├── server/ # Node.js/Express backend │ ├── Schema/ │ ├── server.js │ └── package.json ├── test/ # Test HTML and assets ├── .gitignore └── Readme.md

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- MongoDB instance (local or cloud)
- AWS S3 bucket (for image uploads)
- Firebase project (for Google OAuth)

### Setup

#### 1. Backend

1. Copy `server/.env.example` to `server/.env` and fill in your MongoDB, AWS, and JWT credentials.
2. Install dependencies:
   ```sh
   cd server
   npm install
3. npm start

   cd byob-frontend
    npm install

    npm run dev

4.Open http://localhost:5173 in your browser

Environment Variables
Backend (server/.env):

DB_LOCATION - MongoDB connection string
AWS_ACCESS_KEY - AWS access key
AWS_SECRET_ACCESS_KEY - AWS secret key
SECRET_ACCESS_KEY - JWT secret
Frontend (byob-<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>frontend</vscode_annotation>/.env):

VITE_SERVER_DOMAIN - Backend API URL
Scripts
Frontend:

npm run dev - Start Vite dev server
npm run build - Build for production
Backend:

npm start - Start backend with nodemon
License
This project is licensed under the ISC License.

Created to help aspiring bloggers succeed.
BYOB Blogging Platform © 2025