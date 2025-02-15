import {
  DetectionEvent,
  LocationChangedEvent,
  SupportNeededEvent,
  DartStatusUpdateEvent,
  DartDeploymentDroneEntity,
  DataReceiverDroneEntity,
  DartEntity,
  SpawnEntityEvent,
} from "./interfaces";

// define type for 3D coordinates
type ThreeDCoordinates = [number, number, number];

type RedirectableEvent =
  | DetectionEvent
  | LocationChangedEvent
  | SupportNeededEvent
  | DartStatusUpdateEvent
  | SpawnEntityEvent;

type Entity = DartDeploymentDroneEntity | DataReceiverDroneEntity | DartEntity;

// named export
export { ThreeDCoordinates, RedirectableEvent, Entity };
