# Real-Time Chat Application

A full-stack real-time chat application built with the **MERN stack**, **Socket.IO**, **JWT authentication**, and **MongoDB Atlas**.

The application supports user authentication, protected routes, real-time messaging, online-user tracking, conversation management, and a responsive chat interface.

---

## Features

- User signup and login
- JWT-based authentication
- Secure protected API routes
- Password hashing with bcrypt
- Real-time messaging using Socket.IO
- Online-user presence tracking
- Send and receive messages instantly
- Conversation sidebar
- Search users
- Message history
- Logout functionality
- MongoDB Atlas integration
- React frontend with Vite
- Responsive user interface
- Notification sound for incoming messages
- 3D background and logo components

---

## Architecture

```text
                         REAL-TIME CHAT APPLICATION
                                  |
                 +----------------+----------------+
                 |                                 |
                 v                                 v
          React Frontend                      Node.js Backend
          (Vite)                              (Express.js)
                 |                                 |
       +---------+---------+              +--------+---------+
       |                   |              |                  |
       v                   v              v                  v
   React UI            Context /      REST API          Socket.IO
   Components          Hooks         Routes             Server
       |                   |              |                  |
       |                   |              |                  |
       +---------+---------+              +--------+---------+
                 |                                 |
                 | HTTP / REST API                 |
                 +---------------------------------+
                 |
                 | WebSocket / Socket.IO
                 +---------------------------------+
                                                   |
                                                   v
                                             Controllers
                                                   |
                                      +------------+------------+
                                      |            |            |
                                      v            v            v
                                    Auth         User        Message
                                  Controller   Controller   Controller
                                      |            |            |
                                      +------------+------------+
                                                   |
                                                   v
                                             Middleware
                                            protectRoute
                                                   |
                                                   v
                                              Mongoose
                                                   |
                                                   v
                                           MongoDB Atlas
                                                   |
                                      +------------+------------+
                                      |            |            |
                                      v            v            v
                                  Users       Conversations   Messages
```

### Request Flow

```text
User
 |
 v
React Frontend
 |
 +---- Login / Signup / API Requests ----> Express REST API
 |                                             |
 |                                             v
 |                                        Controllers
 |                                             |
 |                                             v
 |                                        MongoDB Atlas
 |
 +---- Socket.IO Connection ----------------> Socket.IO Server
                                               |
                                               v
                                         Online Users
                                               |
                                               v
                                         Real-Time Events
                                               |
                                               v
                                         Other Clients
```

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Socket.IO Client
- Zustand
- React Hooks
- HTML5 Audio

### Backend

- Node.js
- Express.js
- Socket.IO
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- dotenv

### Database

- MongoDB Atlas
- MongoDB
- Mongoose ODM

### Development Tools

- Git
- GitHub
- VS Code
- npm
- Linux / WSL

---

## Project Structure

```text
Chat_APP/
│
├── Backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   │
│   ├── DB/
│   │   └── connectToMongoDB.js
│   │
│   ├── middleware/
│   │   └── protectRoute.js
│   │
│   ├── models/
│   │   ├── conversation.model.js
│   │   ├── message.models.js
│   │   └── usermodel.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   │
│   ├── socket/
│   │   └── socket.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── messages/
│   │   │   ├── sidebar/
│   │   │   ├── skeleton/
│   │   │   └── Threejs/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useGetConversations.js
│   │   │   ├── useGetMessages.js
│   │   │   ├── useListenMessages.js
│   │   │   ├── useLogin.js
│   │   │   ├── useLogout.js
│   │   │   ├── useSendMessage.js
│   │   │   └── useSignup.js
│   │   │
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   │
│   │   ├── utils/
│   │   ├── zustand/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Backend API

### Authentication

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |

### Users

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/api/users` | Get users for sidebar | Yes |

### Messages

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/api/messages/:id` | Get messages for a conversation | Yes |
| POST | `/api/messages/send/:id` | Send a message | Yes |

> The exact API prefix depends on the route mounting configuration in `Backend/server.js`.

---

## Authentication Flow

```text
                    User
                     |
             +-------+-------+
             |               |
           Signup           Login
             |               |
             v               v
       Auth Controller   Auth Controller
             |               |
             +-------+-------+
                     |
                     v
                bcryptjs
                     |
                     v
               MongoDB Atlas
                     |
                     v
               JWT Token
                     |
                     v
              HTTP Cookie
                     |
                     v
              Authenticated
```

Protected routes use the `protectRoute` middleware to verify the authenticated user before allowing access to protected resources.

---

## Real-Time Messaging Flow

```text
User A
  |
  | Sends Message
  v
React Frontend
  |
  v
Express API
  |
  v
Message Controller
  |
  +------> MongoDB
  |
  v
Socket.IO
  |
  | Receiver Socket ID
  v
User B
  |
  v
React Frontend
  |
  v
New Message Displayed
```

Socket.IO is also used to maintain a mapping between authenticated users and their active socket connections.

```text
userSocketMap

{
    userId_1: socketId_1,
    userId_2: socketId_2,
    userId_3: socketId_3
}
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_secret
NODE_ENV=development
PORT=5000
```

### Important

Do not commit `.env` to GitHub.

Make sure `.gitignore` contains:

```gitignore
.env
node_modules/
Frontend/node_modules/
Frontend/dist/
```

If the MongoDB password contains special characters such as `@`, `:`, `/`, `?`, `#`, `%`, or `&`, URL-encode the password before putting it inside the MongoDB connection string.

---

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Set a strong password.
4. Configure the required network access.
5. Copy the MongoDB connection string.
6. Add the connection string to `.env`.
7. Start the backend.
8. Verify that the application reports a successful MongoDB connection.

Example:

```env
MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app
```

---

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Chat_APP
```

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd Frontend
npm install
cd ..
```

---

## Run the Application

### Option 1: Run Backend

From the project root:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Option 2: Run Frontend

Open another terminal:

```bash
cd Frontend
npm run dev
```

Vite will normally provide a URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## Production Build

From the project root:

```bash
npm run build
```

The build script installs the required dependencies and creates the production frontend build.

The generated frontend files will be placed under:

```text
Frontend/dist/
```

The Express server can then serve the generated frontend depending on the configuration in `Backend/server.js`.

---

## Running with Nodemon

For backend development:

```bash
npm run server
```

This uses Nodemon and automatically restarts the backend when source files change.

---

## Application Flow

### 1. Signup

```text
User enters registration details
            |
            v
Frontend signup form
            |
            v
POST /api/auth/signup
            |
            v
Auth Controller
            |
            v
Password hashing
            |
            v
MongoDB
            |
            v
JWT authentication
```

### 2. Login

```text
User enters credentials
            |
            v
POST /api/auth/login
            |
            v
Auth Controller
            |
            v
Validate credentials
            |
            v
Generate JWT
            |
            v
Set authentication cookie
            |
            v
User authenticated
```

### 3. Load Conversations

```text
Authenticated User
       |
       v
GET /api/users
       |
       v
protectRoute
       |
       v
User Controller
       |
       v
MongoDB
       |
       v
Conversation Sidebar
```

### 4. Send Message

```text
Message Input
     |
     v
useSendMessage
     |
     v
POST /api/messages/send/:id
     |
     v
protectRoute
     |
     v
Message Controller
     |
     +------> Save Message in MongoDB
     |
     v
Socket.IO
     |
     v
Receiver
```

---

## Socket.IO Architecture

```text
                 Socket.IO Server
                       |
             +---------+---------+
             |                   |
             v                   v
          User A              User B
       socketId: A          socketId: B
             |                   |
             +---------+---------+
                       |
                 userSocketMap
```

When a user connects, their user ID is associated with their socket ID.

When the user disconnects, their socket mapping is removed and the online-user list is updated.

---

## Database Models

The application contains models for:

### User

Stores user account information and authentication-related data.

```text
User
 |
 +-- username
 +-- fullName
 +-- password
 +-- gender
 +-- profilePic
```

### Conversation

Represents a conversation between users.

```text
Conversation
 |
 +-- participants
 +-- messages
```

### Message

Stores individual messages.

```text
Message
 |
 +-- senderId
 +-- receiverId
 +-- message
 +-- timestamps
```

> Refer to the model files in `Backend/models/` for the exact schema implemented in the project.

---

## Security

The application uses several security mechanisms:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- HTTP cookies for authentication
- Environment variables for secrets
- MongoDB authentication
- Separation of frontend and backend
- `.gitignore` protection for secrets

### Never commit credentials

Do not commit:

```text
.env
MongoDB passwords
JWT secrets
API keys
Private credentials
```

---

## Error Troubleshooting

### MongoDB authentication failed

If you see:

```text
bad auth : authentication failed
```

Check:

1. MongoDB username.
2. MongoDB password.
3. Database user permissions.
4. MongoDB connection string.
5. Special characters in the password.
6. Environment variable name.
7. Whether `.env` is loaded by the backend.

Test whether the variable is loaded:

```bash
node --input-type=module -e "import dotenv from 'dotenv'; dotenv.config(); console.log(process.env.MONGO_DB_URI ? 'MONGO_DB_URI loaded' : 'MONGO_DB_URI NOT loaded')"
```

Do not print the complete connection string because it contains credentials.

---

### MongoDB DNS/SRV error

If you see:

```text
querySrv ENOTFOUND
```

verify DNS resolution:

```bash
nslookup -type=SRV _mongodb._tcp.cluster0.xxxxx.mongodb.net 8.8.8.8
```

If the SRV records resolve correctly, the issue is likely with the connection string or authentication rather than basic DNS resolution.

---

### Frontend `dist/index.html` error

If the backend reports:

```text
ENOENT: no such file or directory, stat 'Frontend/dist/index.html'
```

build the frontend:

```bash
npm run build
```

Then verify:

```bash
ls Frontend/dist
```

You should see the generated frontend files, including:

```text
index.html
assets/
```

---

### Port already in use

Check which process is using the port:

```bash
sudo lsof -i :5000
```

Stop the process if required:

```bash
kill <PID>
```

---

## Git Workflow

Check repository status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add production-ready README"
```

Push:

```bash
git push origin main
```

Create a release tag:

```bash
git tag -a v1.0.0 -m "Initial release"
```

Push the tag:

```bash
git push origin v1.0.0
```

---

## Future Improvements

Potential improvements for future versions:

- Message read receipts
- Typing indicators
- Message reactions
- Image/file sharing
- Group conversations
- Message deletion
- Message editing
- Pagination for messages
- Better error handling
- Input validation
- Rate limiting
- Refresh-token authentication
- Improved security headers
- Docker containerization
- CI/CD pipeline
- AWS deployment
- HTTPS
- Production monitoring
- Centralized logging
- Automated tests

---

## Deployment Architecture

A production deployment can be structured as:

```text
                         Internet
                            |
                            v
                       Load Balancer
                            |
                 +----------+----------+
                 |                     |
                 v                     v
          Frontend / Web          Node.js API
             Server               + Socket.IO
                                       |
                              +--------+--------+
                              |                 |
                              v                 v
                         MongoDB Atlas       Logging /
                                             Monitoring
```

A cloud deployment can use:

```text
Frontend
   |
   v
S3 / CloudFront
   |
   v
Users

Backend
   |
   v
AWS EC2 / ECS
   |
   +---- Socket.IO
   |
   +---- Express API
   |
   v
MongoDB Atlas
```

---

## Project Goals

This project demonstrates practical experience with:

- Full-stack MERN development
- REST API development
- Authentication and authorization
- MongoDB data modeling
- Real-time communication
- WebSocket-based architecture
- React state management
- Backend middleware
- Environment configuration
- Production build processes
- Git and GitHub workflows

---

## License

This project is currently intended for educational and portfolio purposes.

---

## Author

**Siddarth**

MERN Stack | AWS | Cloud & DevOps

