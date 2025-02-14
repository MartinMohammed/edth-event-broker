import { EntitiesEnum, SupportTypesEnum, TopicsEnum } from "./enums";
import { ThreeDCoordinates } from "./types";

// Events are coming from the websocket connection

interface BaseEvent {
  topic_name: TopicsEnum;
  entity_id: string;
  timestamp: Date;
}

// This type is used to detect an entity in the game
interface DetectionEvent extends BaseEvent {
  topic_name: TopicsEnum.DETECTION;
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  probability: number; // probability of the entity
}

// This type is used to detect a location change of an entity in the game
interface LocationChangedEvent extends BaseEvent {
  topic_name: TopicsEnum.LOCATION_CHANGED;
  absoluteCoordinates: ThreeDCoordinates;
}

// This type is used to detect a support needed event
interface SupportNeededEvent extends BaseEvent {
  topic_name: TopicsEnum.SUPPORT_NEEDED;
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  supportType: SupportTypesEnum; // support type reason
  description: string;
}

interface SpeechEvent extends BaseEvent {
  topic_name: TopicsEnum.SPEECH;
  target_id?: string; // optional id of the entity that is the target of the speech
  text: string;
}

// named export
export {
  DetectionEvent,
  LocationChangedEvent,
  SupportNeededEvent,
  SpeechEvent,
};
