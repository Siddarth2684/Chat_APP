import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./DB/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


//instead of creating a hardcoded value for port 5000 we create a varible and either we use 5000 or we get it from env file 
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();


//This will extracts the field or body from authcontroller
//To parse the incoming request with json payloads (from req.body)
app.use(express.json());

app.use(cookieParser());

//adding routes for authentication
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


//this helps the express to serve static files such as html,notiication etc
app.use(express.static(path.join(__dirname,"/Frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"Frontend", "dist", "index.html"));
});

// //Test route
// app.get("/", (req,res) => {
//   //root route http://localhost:5000/
//   res.send("Server is Ready!!");
// }); 



//To listen on server we used port number 5000
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`);
});
