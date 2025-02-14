import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { DartStatusUpdateEvent } from "../../models/interfaces";
import { dartStatusUpdateSchema } from "../../models/schemas";
import { validatePayload } from "../../utils/ValidatePayloads";

function handleDartStatusUpdate(
  socket: Socket,
  payload: DartStatusUpdateEvent,
  ...args: any[]
) {
  console.log(`[Dart Status Update Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Dart Status Update Handler] Additional arguments:`, ...args);
  }

  // validate payload
  console.log(`[Dart Status Update Handler] Validating payload:`, payload);
  const validationResult = validatePayload(dartStatusUpdateSchema, payload);
  if (!validationResult.success) {
    console.error(
      `[Dart Status Update Handler] Invalid payload:`,
      validationResult.error
    );
    return;
  }

  // Broadcast to all clients in the DART_STATUS_UPDATE room, including sender
  socket.broadcast
    .to(TopicsEnum.DART_STATUS_UPDATE)
    .emit(TopicsEnum.DART_STATUS_UPDATE, payload, ...args);
  console.log(
    `[Dart Status Update Handler] Broadcasted dart status update event to topic: ${TopicsEnum.DART_STATUS_UPDATE}`
  );
}

// named export
export { handleDartStatusUpdate };
