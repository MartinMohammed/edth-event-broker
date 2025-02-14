import {
  DetectionEvent,
  LocationChangedEvent,
  SpeechEvent,
  SupportNeededEvent,
} from "./interfaces";

// define type for 3D coordinates
type ThreeDCoordinates = [number, number, number];

type RedirectableEvents =
  | DetectionEvent
  | LocationChangedEvent
  | SupportNeededEvent;

// named export
export { ThreeDCoordinates, RedirectableEvents };
