import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { DetectionEvent } from "../../models/interfaces";
import { detectionEventSchema } from "../../models/schemas";
import { validatePayload } from "../../utils/ValidatePayloads";

function handleDetection(
  socket: Socket,
  payload: DetectionEvent,
  ...args: any[]
) {
  console.log(`[Detection Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Detection Handler] Additional arguments:`, ...args);
  }

  // validate payload
  console.log(`[Detection Handler] Validating payload:`, payload);
  const validationResult = validatePayload(detectionEventSchema, payload);
  if (!validationResult.success) {
    console.error(
      `[Detection Handler] Invalid payload:`,
      validationResult.error
    );
    return;
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
