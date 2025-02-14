// import express.js and create a server
import express from "express";
import { loggingMiddleware } from "./middlewares/logging";
import { socketLoggingMiddleware } from "./socket/middlewares/logging";
import cors from "cors";
import initialStateRouter from "./routes/initialState";
// import http.js and create a server
import http from "http";

// import socket.io and make use of express.js server
import { Server } from "socket.io";
import { handleMain } from "./socket/handlers/mainHandler";
import { instrument } from "@socket.io/admin-ui";
const app = express();
// Add middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// logging middleware
app.use(loggingMiddleware);

// Keep only the router registration
app.use("/api/initialState", initialStateRouter);

const server = http.createServer(app);

// Add this near the top with other constants
const PORT = process.env.PORT || 3000;

// instantiate socket.io server object
// socket.io server instance attached to the express server (which is a http.server)
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
});

instrument(io, {
  auth: false,
});

io.use(socketLoggingMiddleware);

io.on("connection", handleMain);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO Admin UI available at http://localhost:${PORT}/admin`);
});
