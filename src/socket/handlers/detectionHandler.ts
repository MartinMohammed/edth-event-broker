import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { DetectionEvent } from "../../models/interfaces";

function handleDetection(
  socket: Socket,
  payload: DetectionEvent,
  ...args: any[]
) {
  console.log(`[Detection Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Detection Handler] Additional arguments:`, ...args);
  }
  // Broadcast to all clients in the DETECTION room, including sender
  socket.broadcast
    .to(TopicsEnum.DETECTION)
    .emit(TopicsEnum.DETECTION, payload, ...args);
  console.log(
    `[Detection Handler] Broadcasted detection event to topic: ${TopicsEnum.DETECTION}`
  );
}

// named export
export { handleDetection };
