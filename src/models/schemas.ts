// Create schemas for all the events and all the properties of the events

import { z } from "zod";
import {
  DartStatusEnum,
  DroneStatusEnum,
  EntitiesEnum,
  SupportTypesEnum,
  TankStatusEnum,
  TankTypeEnum,
  TopicsEnum,
} from "./enums";

// Can we also create schemas for the api routes
// and use them in the routes to validate the request body?
const textToSpeechSchema = z.object({
  text: z.string().min(1).max(1000),
});

// please list example format of the timestamp
// 2024-01-01T00:00:00.000Z
const isoTimestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const baseEventSchema = z.object({
  eventId: z.string(),
  topicName: z.nativeEnum(TopicsEnum),
  timestamp: z.string().regex(isoTimestampRegex),
});

const baseEntitySchema = z.object({
  entityId: z.string(),
  type: z.nativeEnum(EntitiesEnum), // Changed from literal to nativeEnum to match BaseEntity interface
  absoluteCoordinates: z.array(z.number()).optional(),
  name: z.string(),
  createdAt: z.string().regex(isoTimestampRegex),
  updatedAt: z.string().regex(isoTimestampRegex),
});

const droneBaseEntitySchema = baseEntitySchema.extend({
  status: z.nativeEnum(DroneStatusEnum),
  batteryLevel: z.number(),
});

const tankBaseEntitySchema = baseEntitySchema.extend({
  name: z.nativeEnum(TankTypeEnum),
  status: z.nativeEnum(TankStatusEnum),
});

// Base event schema
const detectionEventSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.DETECTION),
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  probability: z.number(),
  lastSeen: z.string().regex(isoTimestampRegex),
  entity: z.union([tankBaseEntitySchema, droneBaseEntitySchema]),
});

const locationChangedEventSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.LOCATION_CHANGED),
  absoluteCoordinates: z.array(z.number()),
});

const supportNeededEventSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.SUPPORT_NEEDED),
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  supportType: z.nativeEnum(SupportTypesEnum),
  description: z.string(),
});

const speechEventSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.SPEECH),
  targetId: z.string().optional(),
  text: z.string(),
});

const dartStatusUpdateSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.DART_STATUS_UPDATE),
  status: z.nativeEnum(DartStatusEnum),
});

const dartSchema = baseEntitySchema.extend({
  type: z.literal(EntitiesEnum.DART),
  status: z.nativeEnum(DartStatusEnum),
  absoluteCoordinates: z.array(z.number()).optional(),
});

const dartDeploymentDroneSchema = droneBaseEntitySchema.extend({
  type: z.literal(EntitiesEnum.DART_DEPLOYMENT_DRONE),
  darts: z.array(dartSchema),
});

const dataReceiverDroneSchema = droneBaseEntitySchema.extend({
  type: z.literal(EntitiesEnum.DATA_RECEIVER_DRONE),
  absoluteCoordinates: z.array(z.number()),
  pullTimes: z.array(z.number()),
  pullStatuses: z.array(z.boolean()),
});

const spawnEntityEventSchema = baseEventSchema.extend({
  topicName: z.literal(TopicsEnum.SPAWN_ENTITY),
  // can be of multiple types
  entity: z.union([
    dartDeploymentDroneSchema,
    dataReceiverDroneSchema,
    dartSchema,
  ]),
});

export {
  textToSpeechSchema,
  detectionEventSchema,
  locationChangedEventSchema,
  supportNeededEventSchema,
  speechEventSchema,
  dartStatusUpdateSchema,
  dartDeploymentDroneSchema,
  dataReceiverDroneSchema,
  spawnEntityEventSchema,
};
