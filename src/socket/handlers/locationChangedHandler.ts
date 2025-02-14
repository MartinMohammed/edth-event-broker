import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { DetectionEvent, LocationChangedEvent } from "../../models/interfaces";
import { validatePayload } from "../../utils/ValidatePayloads";
import { locationChangedEventSchema } from "../../models/schemas";

function handleLocationChanged(
  socket: Socket,
  payload: LocationChangedEvent,
  ...args: any[]
) {
  console.log(`[Location Changed Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Location Changed Handler] Additional arguments:`, ...args);
  }
  // validate payload
  console.log(`[Location Changed Handler] Validating payload:`, payload);
  const validationResult = validatePayload(locationChangedEventSchema, payload);
  if (!validationResult.success) {
    console.error(
      `[Location Changed Handler] Invalid payload:`,
      validationResult.error
    );
    return;
  }
  // Broadcast to all clients in the LOCATION_CHANGED room, including sender
  socket.broadcast
    .to(TopicsEnum.LOCATION_CHANGED)
    .emit(TopicsEnum.LOCATION_CHANGED, payload, ...args);
  console.log(
    `[Location Changed Handler] Broadcasted location changed event to topic: ${TopicsEnum.LOCATION_CHANGED}`
  );
}

// named export
export { handleLocationChanged };
