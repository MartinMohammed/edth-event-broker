import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { DetectionEvent, LocationChangedEvent } from "../../models/interfaces";

function handleLocationChanged(
  socket: Socket,
  payload: LocationChangedEvent,
  ...args: any[]
) {
  console.log(`[Location Changed Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Location Changed Handler] Additional arguments:`, ...args);
  }
  // Broadcast to all clients in the DETECTION room, including sender
  socket.broadcast
    .to(TopicsEnum.DETECTION)
    .emit(TopicsEnum.DETECTION, payload, ...args);
  console.log(
    `[Location Changed Handler] Broadcasted location changed event to topic: ${TopicsEnum.LOCATION_CHANGED}`
  );
}

// named export
export { handleLocationChanged };
