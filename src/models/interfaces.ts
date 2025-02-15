import {
  DartStatusEnum,
  DroneStatusEnum,
  EntitiesEnum,
  SupportTypesEnum,
  TopicsEnum,
} from "./enums";
import { ThreeDCoordinates, Entity } from "./types";

interface InitialState {
  // check for interfaces that inherited from BaseEntity
  entities: Entity[];
}

// Events are coming from the websocket connection
interface BaseEvent {
  topic_name: TopicsEnum;
  entity_id: string;
  timestamp: Date;
}

interface BaseEntity {
  id: string;
  type: EntitiesEnum;
  absoluteCoordinates?: ThreeDCoordinates;
}

// This type is used to detect an entity in the game
interface DetectionEvent extends BaseEvent {
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  probability: number; // probability of the entity
}

// This type is used to detect a location change of an entity in the game
interface LocationChangedEvent extends BaseEvent {
  absoluteCoordinates: ThreeDCoordinates;
}

// This type is used to detect a support needed event
interface SupportNeededEvent extends BaseEvent {
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  supportType: SupportTypesEnum; // support type reason
  description: string;
}

interface SpeechEvent extends BaseEvent {
  target_id?: string; // optional id of the entity that is the target of the speech
  text: string;
}

interface DartStatusUpdateEvent extends BaseEvent {
  status: DartStatusEnum;
}

interface SpawnEntityEvent extends BaseEvent {
  type: EntitiesEnum;
  absoluteCoordinates: ThreeDCoordinates;
  // difference to detection event is that the entity is not detected but spawned
}

interface Dart extends BaseEntity {
  type: EntitiesEnum.DART;
  status: DartStatusEnum;
  absoluteCoordinates?: ThreeDCoordinates; // optional because the dart is not deployed yet
}

// Interface for the initial states
// the DartDeploymentDrone is the entity that will deploy the darts all over the map
interface DartDeploymentDroneEntity extends BaseEntity {
  type: EntitiesEnum.DART_DEPLOYMENT_DRONE;
  status: DroneStatusEnum;
  batteryLevel: number; // the battery level of the drone
  darts: Dart[];
}

interface DataReceiverDroneEntity extends BaseEntity {
  type: EntitiesEnum.DATA_RECEIVER_DRONE;
  status: DroneStatusEnum;
  pullTimes: number[]; // the different times in which the drone will pull the data from the darts, the length will determine the number of times the drone will fly in the sky to receive the transmission of the darts.
  absoluteCoordinates: ThreeDCoordinates;
  batteryLevel: number; // the battery level of the drone
}

// named export
export {
  DetectionEvent,
  LocationChangedEvent,
  SupportNeededEvent,
  SpeechEvent,
  DartStatusUpdateEvent,
  SpawnEntityEvent,
  DartDeploymentDroneEntity,
  DataReceiverDroneEntity,
  InitialState,
};
