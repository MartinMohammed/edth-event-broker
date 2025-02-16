import {
  DetectionEvent,
  LocationChangedEvent,
  SupportNeededEvent,
  DartStatusUpdateEvent,
  DartDeploymentDroneEntity,
  DataReceiverDroneEntity,
  DartEntity,
  SpawnEntityEvent,
  TankBaseEntity,
  HelicopterBaseEntity,
} from "./interfaces";

// define type for 3D coordinates
type ThreeDCoordinates = [number, number, number];

type RedirectableEvent =
  | DetectionEvent
  | LocationChangedEvent
  | SupportNeededEvent
  | DartStatusUpdateEvent
  | SpawnEntityEvent;

type Entity =
  | DartDeploymentDroneEntity
  | DataReceiverDroneEntity
  | DartEntity
  | TankBaseEntity
  | HelicopterBaseEntity;

// named export
export { ThreeDCoordinates, RedirectableEvent, Entity };
