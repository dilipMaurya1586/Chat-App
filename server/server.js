import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js'
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";


//express app
const app = express()
const server = http.createServer(app);

//initialize socket
export const io = new Server(server, {
    cors: { origin: "*" }
})

//store online users
export const userSocketMap = {};

//socket handiler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);
    if (userId) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

//middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// router
app.use("/api/status", (req, res) => res.send("Server is Live...!"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//Connected database
await connectDB();


if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is runing on PORT:: ${PORT}`)
    })
}
export default server;


