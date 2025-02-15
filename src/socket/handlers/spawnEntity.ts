import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import { SpawnEntityEvent } from "../../models/interfaces";
import { validatePayload } from "../../utils/ValidatePayloads";
import { spawnEntityEventSchema } from "../../models/schemas";

function handleSpawnEntity(
  socket: Socket,
  payload: SpawnEntityEvent,
  ...args: any[]
) {
  console.log(`[Spawn Entity Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Spawn Entity Handler] Additional arguments:`, ...args);
  }
  // validate payload
  console.log(`[Spawn Entity Handler] Validating payload:`, payload);
  const validationResult = validatePayload(spawnEntityEventSchema, payload);
  if (!validationResult.success) {
    console.error(
      `[Spawn Entity Handler] Invalid payload:`,
      validationResult.error
    );
    return;
  }
  // Broadcast to all clients in the LOCATION_CHANGED room, including sender
  socket.broadcast
    .to(TopicsEnum.LOCATION_CHANGED)
    .emit(TopicsEnum.LOCATION_CHANGED, payload, ...args);
  console.log(
    `[Spawn Entity Handler] Broadcasted spawn entity event to topic: ${TopicsEnum.SPAWN_ENTITY}`
  );
}

// named export
export { handleSpawnEntity };
