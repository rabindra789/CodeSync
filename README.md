# **CodeSync - Real-Time Collaborative Coding Platform**  

## **Table of Contents**  
- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
- [Room Management](#room-management)  
- [Real-Time Collaboration](#real-time-collaboration)  
- [Authentication](#authentication)  
- [Frontend Dashboard](#frontend-dashboard)  
- [Error Handling](#error-handling)  
- [Future Improvements](#future-improvements)  

---

## **Overview**  
**CodeSync** is a real-time collaborative coding platform that allows users to create coding rooms, invite others, and code together with live synchronization. It uses **MongoDB** for storing room and user data, **Liveblocks** for real-time collaboration, and **Judge0** for multi-language code execution.

---

## **Features**  
✅ User authentication (Signup/Login)  
✅ Create and join rooms for real-time coding  
✅ Persistent room storage in MongoDB  
✅ Live cursor tracking with usernames  
✅ Code execution in multiple languages via Judge0 API  
✅ Invite links to share rooms  
✅ Redis caching for optimized performance  

---

## **Tech Stack**  

### **Frontend**  
- **EJS (Embedded JavaScript Templates)**  
- **CSS (No Tailwind, just standard CSS)**  
- **JavaScript**  

### **Backend**  
- **Node.js + Express.js**  
- **MongoDB (Mongoose ORM)**  
- **Redis (for caching)**  
- **Liveblocks (for real-time collaboration)**  
- **Judge0 API (for code execution)**  

---

## **Project Structure**  
```
CodeSync/
│── backend/
│   ├── models/               # Mongoose Models
│   ├── routes/               # Express Routes
│   ├── controllers/          # Business Logic Controllers
│   ├── config/               # Database & Liveblocks Config
│   ├── middleware/           # Authentication Middleware
│   ├── server.js             # Express Server Entry Point
│
│── frontend/
│   ├── public/               # Static Assets (CSS, JS)
│   ├── views/                # EJS Templates
│   ├── routes/               # Frontend Routes
│   ├── app.js                # Frontend Express Server
│
│── .env                      # Environment Variables
│── package.json              # Dependencies
│── README.md                 # Project Documentation
│── LICENSE                   # License Information
```

---

## **Installation**  

### **Prerequisites**  
- **Node.js (v18+)**  
- **MongoDB (installed & running)**  
- **Redis (installed & running)**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/yourusername/CodeSync.git
cd CodeSync
```

### **2. Install Backend Dependencies**  
```sh
cd backend
npm install
```

### **3. Install Frontend Dependencies**  
```sh
cd ../frontend
npm install
```

---

## **Configuration**  

### **Create `.env` file in the Backend Directory**  
```sh
PORT=5000
MONGO_URI=mongodb://localhost:27017/codesync
REDIS_URL=redis://localhost:6379
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret
JUDGE0_API_KEY=your_judge0_api_key
JWT_SECRET=your_jwt_secret
```

---

## **Running the Application**  

### **Start Backend**  
```sh
cd backend
npm start
```

### **Start Frontend**  
```sh
cd frontend
npm start
```

**The frontend will be available at** `http://localhost:3000`  
**The backend will run on** `http://localhost:5000`

---

## **API Endpoints**  

### **Authentication**  
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/api/auth/signup`   | Register a new user       |
| POST   | `/api/auth/login`    | Authenticate user         |

### **Room Management**  
| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | `/api/create-room`       | Create a new coding room     |
| GET    | `/api/rooms/:roomId`      | Get details of a room        |
| GET    | `/api/users/:userId/rooms`| Get all rooms of a user      |

### **Collaboration & Execution**  
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| POST   | `/api/execute`      | Execute code via Judge0 API        |
| POST   | `/api/rooms/join`   | Join an existing coding room       |

---

## **Room Management**  

### **Creating a Room**  
```sh
POST /api/create-room
{
    "userId": "67b5b8220b3aed0b0d5558f5",
    "roomId": "unique-room-id"
}
```
This will create a **room** and store it in MongoDB under the user's `rooms` array.

---

## **Real-Time Collaboration**  

- **Liveblocks** enables live code synchronization  
- Users can **see each other’s cursors** and real-time changes  
- **Invite links** allow anyone to join a room instantly  

### **Generating an Invite Link**
Each room gets a unique shareable URL:
```
http://localhost:3000/room/67b5b8220b3aed0b0d5558f5
```
This URL allows another user to join the same session.

---

## **Authentication**  

- **Users can register and log in**  
- **JWT-based authentication** is used  
- **Sessions are stored securely**  

Example **login request**:
```sh
POST /api/auth/login
{
    "email": "user@example.com",
    "password": "password123"
}
```
Response:
```json
{
    "message": "Login successful",
    "user": {
        "id": "67b5b8220b3aed0b0d5558f5",
        "email": "user@example.com"
    }
}
```

---

## **Frontend Dashboard**  

- Shows all **created rooms**  
- Allows users to **create a new room**  
- Displays **active users in a room**  

### **Frontend Route for Dashboard**
```js
router.get("/dashboard/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("rooms");

        res.render("pages/dashboard", { user, rooms: user.rooms || [] });

    } catch (error) {
        res.status(500).send("Error loading dashboard");
    }
});
```

---

## **Error Handling**  

All API responses follow this structure:
```json
{
    "message": "Error message here",
    "error": "Detailed error log"
}
```
Common errors handled:
- Missing or invalid **User ID**
- **MongoDB validation errors**
- **Liveblocks API failures**
- **Redis caching errors**

---

## **Future Improvements**  

🔹 **Google OAuth for Authentication**  
🔹 **More Code Execution Features**  
🔹 **File Uploads & Sharing**  
🔹 **Mobile App Integration**  

---

## **License**  
This project is **open-source** under the **MIT License**. Feel free to contribute! 🚀  
