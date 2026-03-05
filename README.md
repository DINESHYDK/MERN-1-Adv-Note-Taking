# 📓 YDK Notes - Advanced MERN App (v1.0)

A full-stack, production-ready note-taking application built with the MERN stack. Version 1.0 features an intuitive UI, dynamic theme switching, and robust backend protection using Redis-based rate limiting.

## ✨ Features

* **Complete CRUD Operations:** Create, read, update, and delete notes seamlessly.
* **Dynamic Theming:** 6 built-in DaisyUI themes (Valentine, Lemonade, Aqua, Dracula, Emerald, Autumn) saved to local storage.
* **API Rate Limiting:** Backend endpoints are protected from spam/DDoS using Upstash Redis.
* **Optimistic UI Updates:** Instant visual feedback for deletions and updates.
* **Single URL Deployment:** Backend Express server serves the compiled React frontend in production.
* **Responsive Design:** Mobile-first layout using Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
* React 19 (Vite)
* Tailwind CSS & DaisyUI
* React Router v7
* Axios & React Hot Toast (Notifications)
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* Upstash Redis (for Rate Limiting)
* CORS & Dotenv

## 📂 Project Structure

This project uses a monorepo architecture:

```text
├── backend/                # Node.js Express server
│   ├── src/
│   │   ├── config/         # Database and Redis connections
│   │   ├── controllers/    # API logic (notesController.js)
│   │   ├── middleware/     # Custom rate limiter
│   │   ├── models/         # Mongoose schemas (Note.js)
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
├── frontend/               # Vite React application
│   ├── src/
│   │   ├── components/     # Reusable UI (NavBar, NoteCard, ConfirmModal)
│   │   ├── lib/            # Axios instance and utilities
│   │   ├── pages/          # App views (Home, Create, Preview)
│   │   └── main.jsx        # React DOM entry
├── package.json            # Root configuration for monorepo deployment
└── .gitignore              # Universal git ignores
```
🚀 Getting Started (Local Development)
1. Clone the repository
Bash
git clone [https://github.com/DINESHYDK/MERN-1-Adv-Note-Taking.git](https://github.com/DINESHYDK/MERN-1-Adv-Note-Taking.git)
cd MERN-1-Adv-Note-Taking
2. Set up Environment Variables
Create a .env file in the backend folder (or root, depending on your setup) and add the following keys:

Code snippet
MONGO_URI="your_mongodb_connection_string"
UPSTASH_REDIS_REST_URL="your_upstash_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
NODE_ENV="development"
PORT=5001
3. Install Dependencies
Using the root package.json, install all frontend and backend dependencies at once:

Bash
npm run build
(Note: Locally, you might need to run npm install inside both backend and frontend folders manually if the root script is strictly configured for Render).

4. Run the Application
Terminal 1 (Backend):

Bash
cd backend
npm run dev
Terminal 2 (Frontend):

Bash
cd frontend
npm run dev
Your frontend will be available at http://localhost:5173 and your backend API at http://localhost:5001.

## 🚀 Future Roadmap

We are continuously working to improve YDK Notes. Here are the features planned for the next major release:

*   **⌨️ Keyboard Shortcuts:** Implementation of productivity-focused hotkeys for rapid navigation, creation, and editing of notes without leaving the keyboard.
*   **🔐 User Authentication:** Secure sign-up/login functionality to support multiple user accounts, ensuring private data isolation and secure access.
*   **📝 Rich Text Formatting:** Robust text editing capabilities (Markdown support or WYSIWYG editor) to allow for bolding, italics, lists, and code blocks for structured content.
*   **📁 Note Organization:** Introduction of folders, tags, or categories to help users better organize and manage their notes.