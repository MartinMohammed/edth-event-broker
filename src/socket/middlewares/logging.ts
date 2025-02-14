// middleware to log the client connection
import { Socket } from "socket.io";

export const loggingMiddleware = (socket: Socket, next: any) => {
  console.log(`Middleware: Client connected: ${socket.id}`);
  next();
};
