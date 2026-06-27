# 🌾 AI Smart Agriculture Platform

A full-stack agriculture management platform for Uttarakhand farmers — built with React + Vite (frontend) and Node.js + Express (backend).

---

## 📦 Project Structure

```
ai-smart-agriculture-platform/
├── src/                        # React frontend source
│   ├── components/             # Shared UI components (Navbar, Footer, ui/)
│   │   └── ui/                 # Button, Input, Loader, Modal, Toast
│   ├── context/                # ThemeContext (dark/light mode)
│   ├── data/                   # mockData.js (weather, analytics, AI prompts)
│   ├── pages/                  # Home, About, Dashboard, Login, Crops, AIAssistant
│   └── services/               # api.js — Axios client + service modules
├── backend/                    # Node.js + Express REST API
│   ├── server.js               # Entry point
│   ├── routes/                 # crops.js
│   ├── controllers/            # cropsController.js
│   ├── middleware/             # errorHandler.js, requestLogger.js
│   ├── data/                   # crops.js (in-memory seed data)
│   ├── .env.example            # Environment variable template
│   └── package.json
├── public/                     # Static assets
├── index.html
├── vite.config.js
├── package.json                # Frontend deps (React, Vite, Axios, Tailwind)
├── .env.example                # Frontend env template
├── .gitignore
└── README.md
```

---

## 🚀 Installation & How to Run

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

---

### Frontend

```bash
# In the project root
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at **http://localhost:5000**

> **Note:** Copy `.env.example` to `.env` before starting:
> ```bash
> cp backend/.env.example backend/.env
> ```

---

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/crops` | Get all crops (optional `?status=Growing`) |
| `GET` | `/crops/search?q=` | Search crops by name, variety, district, season |
| `GET` | `/crops/:id` | Get a single crop by ID |
| `POST` | `/crops` | Create a new crop |
| `PUT` | `/crops/:id` | Update a crop (partial or full) |
| `DELETE` | `/crops/:id` | Delete a crop |
| `GET` | `/health` | API health check |

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `204` | No Content (DELETE) |
| `400` | Bad Request (validation error) |
| `404` | Not Found |
| `500` | Internal Server Error |

### Example: Create a Crop

```bash
curl -X POST http://localhost:5000/api/crops \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lentil",
    "icon": "🫙",
    "variety": "Masur",
    "district": "Dehradun",
    "area": 75,
    "areaUnit": "hectares",
    "status": "Planted",
    "health": "Good",
    "progress": 15,
    "season": "Rabi",
    "farmers": 42,
    "notes": "New crop added via API."
  }'
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Backend | Node.js, Express 4 |
| Data | In-memory JSON arrays (no database) |
| Dev Tools | nodemon, dotenv, cors |

---

## 🗓️ Week-by-Week Progress

| Week | Features |
|------|----------|
| 1–2 | Project setup, Tailwind theming, component library |
| 3 | All pages (Home, About, Dashboard, Login, Crops, AI Assistant), dark/light mode, mock data |
| **4** | **Express REST API, real Axios calls for Crops & Dashboard, error handling, Loader + Toast integration** |

---

## 📄 Environment Variables

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request
