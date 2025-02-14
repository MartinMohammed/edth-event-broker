import { EntitiesEnum, SupportTypesEnum } from "./enums";
import { ThreeDCoordinates } from "./types";

// Events are coming from the websocket connection

// This type is used to detect an entity in the game
interface DetectionEvent {
  entity_id: string; // id of the entity that was detected
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  timestamp: Date;
  probability: number; // probability of the entity
}

// This type is used to detect a location change of an entity in the game
interface LocationChangedEvent {
  entity_id: string; // id of the entity that changed location
  timestamp: Date;
  absoluteCoordinates: ThreeDCoordinates;
}

// This type is used to detect a support needed event
interface SupportNeededEvent {
  entity_id: string; // id of the entity that needs support
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  timestamp: Date;
  supportType: SupportTypesEnum; // support type reason
  description: string;
}

// named export
export { DetectionEvent, LocationChangedEvent, SupportNeededEvent };
