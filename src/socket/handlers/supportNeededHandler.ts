// add support handler similar like the other handlers

import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { SupportNeededEvent } from "../../models/interfaces";

function handleSupportNeeded(
  socket: Socket,
  payload: SupportNeededEvent,
  ...args: any[]
) {
  console.log(`[Support Needed Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Support Needed Handler] Additional arguments:`, ...args);
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
