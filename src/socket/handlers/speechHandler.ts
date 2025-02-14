// create speech handler similar like the other handlers

import { Socket } from "socket.io";
import { TopicsEnum } from "../../models/enums";
import {
  DetectionEvent,
  LocationChangedEvent,
  SpeechEvent,
  SupportNeededEvent,
} from "../../models/interfaces";
import { handleDetection } from "./detectionHandler";
import { handleSupportNeeded } from "./supportNeededHandler";
import { handleLocationChanged } from "./locationChangedHandler";
import { RedirectableEvent } from "../../models/types";

function getEventsFromSpeech(speech: string) {
  // make api request to LLM which will return structured response for which event(s) the text in the speech deals about
  return [
    {
      topic_name: TopicsEnum.DETECTION,
      entity_id: "entity-1",
      type: "soldier",
      absoluteCoordinates: [48.8566, 2.3522, 0], // Example coordinates (Paris)
      timestamp: new Date().toISOString(), // format of timestamp is in string yyyy-mm-ddThh:mm:ss.msZ
      probability: 0.95, // probability of the entity
    },
    {
      topic_name: TopicsEnum.SUPPORT_NEEDED,
      entity_id: "entity-2",
      type: "soldier",
      absoluteCoordinates: [48.8566, 2.3522, 0],
      timestamp: new Date().toISOString(),
      supportType: "medical",
      description: "The soldier is injured",
    },
  ];
}

function redirectEvents(socket: Socket, events: RedirectableEvent[]) {
  for (const event of events) {
    switch (event.topic_name) {
      case TopicsEnum.DETECTION:
        handleDetection(socket, event as unknown as DetectionEvent);
        break;
      case TopicsEnum.LOCATION_CHANGED:
        handleLocationChanged(socket, event as unknown as LocationChangedEvent);
        break;
      case TopicsEnum.SUPPORT_NEEDED:
        handleSupportNeeded(socket, event as unknown as SupportNeededEvent);
        break;
      default:
        console.log(`[Speech Handler] Unknown event:`, event);
        break;
    }
  }
}

function handleSpeech(socket: Socket, payload: SpeechEvent, ...args: any[]) {
  console.log(`[Speech Handler] Received payload:`, payload);
  if (args.length > 0) {
    console.log(`[Speech Handler] Additional arguments:`, ...args);
  }
  // Broadcast to all clients in the SPEECH room, including sender
  // This will send message to a different topic

  // make api request to LLM which will return structured response for which event(s) the text in the speech deals about
  const speechText = payload.text;
  console.log(`[Speech Handler] Speech Text:`, speechText);
  const events = getEventsFromSpeech(speechText);

  console.log(`[Speech Handler] Events:`, events);

  redirectEvents(socket, events as unknown as RedirectableEvent[]);
}

export { handleSpeech };
