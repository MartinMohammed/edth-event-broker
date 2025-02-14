// import express.js and create a server
import express from "express";

import { instrument } from "@socket.io/admin-ui";

// import http.js and create a server
import http from "http";
const app = express();
// Add middleware to parse JSON bodies
app.use(express.json());

const server = http.createServer(app);

// import socket.io and make use of express.js server
import { Server } from "socket.io";
import { loggingMiddleware } from "./socket/middlewares/logging";
import { handleMain } from "./socket/handlers/mainHandler";
// http server host static folder
app.use(express.static("public"));

// Add this near the top with other constants
const PORT = process.env.PORT || 3000;

// Add this after the static middleware
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

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

io.use(loggingMiddleware);

io.on("connection", handleMain);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO Admin UI available at http://localhost:${PORT}/admin`);
});
