# ✦ Taskly — Cloud Todo App

A professional, fully-featured cloud task manager built with React + Firebase.

## Features
- 🔐 **Authentication** — Email/Password Sign Up & Login
- ➕ **Add Tasks** — with title, note, priority, due date, category
- ✏️ **Edit Tasks** — update any task details inline
- 🗑️ **Delete Tasks** — instant removal from cloud
- ✅ **Complete Tasks** — one-click toggle with visual feedback
- ⚡ **Real-time sync** — changes appear instantly across all devices
- 🔍 **Search** — full-text search across task titles and notes
- 🏷️ **Categories** — Personal, Work, Study, Health, Shopping, Other
- 📅 **Due Dates** — with overdue detection and highlighting
- ▲ **Priority Levels** — High / Medium / Low with color coding
- ◐ **Dark Mode** — full dark theme toggle
- 📱 **Responsive** — works on mobile, tablet, and desktop
- 📊 **Progress bar** — visual completion tracker

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Auth | Firebase Authentication |
| Database | Firebase Firestore (real-time) |
| Styling | Pure CSS with CSS variables |
| Hosting | Vercel / Firebase Hosting |

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/taskly-cloud-todo.git
cd taskly-cloud-todo
npm install
npm run dev
```

## Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Email/Password
3. Enable **Firestore Database**
4. Go to Firestore → **Rules** tab → paste contents of `firestore.rules`
5. Add a Firestore composite index when prompted (link appears in console on first use)

## Data Model
```
todos (collection)
  └── {todoId}
        ├── text: string
        ├── note: string
        ├── priority: "high" | "medium" | "low"
        ├── category: string
        ├── dueDate: string (YYYY-MM-DD)
        ├── completed: boolean
        ├── uid: string
        └── createdAt: timestamp
```

## Deploy to Vercel
1. Push to GitHub
2. Go to vercel.com → Import repo → Deploy
