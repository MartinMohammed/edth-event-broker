import { TopicsEnum } from "../../models/enums";
import {
  DetectionEvent,
  LocationChangedEvent,
  SpeechEvent,
  SupportNeededEvent,
} from "../../models/interfaces";
import { handleDetection } from "./detectionHandler";
import { handleLocationChanged } from "./locationChangedHandler";
import { Socket } from "socket.io";
import { handleSupportNeeded } from "./supportNeededHandler";
import { handleSpeech } from "./speechHandler";
export const handleMain = (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("subscribe", (topics) => {
    console.log(`Client ${socket.id} subscribed to topics:`, topics);
    socket.join(topics);
  });

  socket.on(TopicsEnum.DETECTION, (payload: DetectionEvent, ...args: any[]) => {
    handleDetection(socket, payload, ...args);
  });

  socket.on(
    TopicsEnum.LOCATION_CHANGED,
    (payload: LocationChangedEvent, ...args: any[]) => {
      handleLocationChanged(socket, payload, ...args);
    }
  );

  socket.on(
    TopicsEnum.SUPPORT_NEEDED,
    (payload: SupportNeededEvent, ...args: any[]) => {
      handleSupportNeeded(socket, payload, ...args);
    }
  );

  socket.on(TopicsEnum.SPEECH, (payload: SpeechEvent, ...args: any[]) => {
    handleSpeech(socket, payload, ...args);
  });

  socket.on("unsubscribe", (topic: string) => {
    socket.leave(topic);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
