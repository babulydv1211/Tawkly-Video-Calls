
# 🌟 TAWKLY – Fullstack Chat & Video Calling App 🌟

A **feature-rich fullstack** application designed for **real-time messaging, group and 1-on-1 video calls**, built with modern technologies.

![Tawkly Preview](./assets/tawkly-banner.png)

---

## 🚀 Features

- 🌐 **Real-time Chat** with typing indicators, message reactions
- 📹 **1-on-1 & Group Video Calls** with screen sharing & recording
- 👥 **Unlimited Group Chat**
- 🎨 **32 Unique UI Themes** – for an amazing user experience
- 🔐 **JWT Authentication** and secure protected routes
- 🌍 **Language Exchange Mode**
- 🧠 **Global State Management** using Zustand
- 🚨 Robust Error Handling on both Frontend & Backend
- 📦 **Free Deployment Ready**
- ⚡ Built on **Stream API** – highly scalable & production-grade

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Zustand, TanStack Query  
- **Backend**: Express.js, MongoDB, JWT  
- **Real-time Infra**: [Stream Chat API](https://getstream.io/chat/)

---

## 📁 Project Structure

```
tawkly/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── context/
    └── main.jsx
```

---

## 🔐 Environment Setup

### Backend `/backend/.env`

```env
PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend `/frontend/.env`

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tawkly.git
cd tawkly
```

### 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Deployment

This app can be easily deployed on:

- **Vercel / Netlify** for Frontend  
- **Render / Railway / Cyclic / GCP** for Backend  

---

## 📸 UI Showcase

- Elegant chat interface  
- Modern video calling screen  
- Profile management  
- Light/Dark Themes  

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

[MIT](LICENSE)

