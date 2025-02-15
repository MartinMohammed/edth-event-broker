// Create schemas for all the events and all the properties of the events

import { z } from "zod";
import {
  DartStatusEnum,
  DroneStatusEnum,
  EntitiesEnum,
  SupportTypesEnum,
  TopicsEnum,
} from "./enums";

// please list example format of the timestamp
// 2024-01-01T00:00:00.000Z
const isoTimestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const baseEventSchema = z.object({
  topic_name: z.nativeEnum(TopicsEnum),
  entity_id: z.string(),
  timestamp: z.string().regex(isoTimestampRegex),
});

const baseEntitySchema = z.object({
  id: z.string(),
  type: z.nativeEnum(EntitiesEnum), // Changed from literal to nativeEnum to match BaseEntity interface
  absoluteCoordinates: z.array(z.number()).optional(),
  name: z.string(),
});

const droneBaseEntitySchema = baseEntitySchema.extend({
  status: z.nativeEnum(DroneStatusEnum),
  batteryLevel: z.number(),
});

// Base event schema
const detectionEventSchema = baseEventSchema.extend({
  topic_name: z.literal(TopicsEnum.DETECTION),
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  probability: z.number(),
});

const locationChangedEventSchema = baseEventSchema.extend({
  topic_name: z.literal(TopicsEnum.LOCATION_CHANGED),
  absoluteCoordinates: z.array(z.number()),
});

const supportNeededEventSchema = baseEventSchema.extend({
  topic_name: z.literal(TopicsEnum.SUPPORT_NEEDED),
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  supportType: z.nativeEnum(SupportTypesEnum),
  description: z.string(),
});

const speechEventSchema = baseEventSchema.extend({
  topic_name: z.literal(TopicsEnum.SPEECH),
  target_id: z.string().optional(),
  text: z.string(),
});

const dartStatusUpdateSchema = baseEventSchema.extend({
  topic_name: z.literal(TopicsEnum.DART_STATUS_UPDATE),
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
  topic_name: z.literal(TopicsEnum.SPAWN_ENTITY),
  // can be of multiple types
  entity: z.union([
    dartDeploymentDroneSchema,
    dataReceiverDroneSchema,
    dartSchema,
  ]),
});

export {
  detectionEventSchema,
  locationChangedEventSchema,
  supportNeededEventSchema,
  speechEventSchema,
  dartStatusUpdateSchema,
  dartDeploymentDroneSchema,
  dataReceiverDroneSchema,
  spawnEntityEventSchema,
};
