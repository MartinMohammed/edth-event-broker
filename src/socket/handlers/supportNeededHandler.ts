// add support handler similar like the other handlers

import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { SupportNeededEvent } from "../../models/interfaces";
import { supportNeededEventSchema } from "../../models/schemas";
import { validatePayload } from "../../utils/ValidatePayloads";

function handleSupportNeeded(
  socket: Socket,
  payload: SupportNeededEvent,
  ...args: any[]
) {
  console.log(`[Support Needed Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Support Needed Handler] Additional arguments:`, ...args);
  }

  // validate payload
  const validationResult = validatePayload(supportNeededEventSchema, payload);
  if (!validationResult.success) {
    console.error(
      `[Support Needed Handler] Invalid payload:`,
      validationResult.error
    );
    return;
  }

  // Broadcast to all clients in the SUPPORT_NEEDED room, including sender
  socket.broadcast
    .to(TopicsEnum.SUPPORT_NEEDED)
    .emit(TopicsEnum.SUPPORT_NEEDED, payload, ...args);
  console.log(
    `[Support Needed Handler] Broadcasted support needed event to topic: ${TopicsEnum.SUPPORT_NEEDED}`
  );
}

export { handleSupportNeeded };
