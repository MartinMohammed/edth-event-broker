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
  type: z.literal(EntitiesEnum.SOLDIER),
  absoluteCoordinates: z.array(z.number()).optional(),
});

// Base event schema
const detectionEventSchema = baseEventSchema.extend({
  type: z.literal(EntitiesEnum.SOLDIER),
  absoluteCoordinates: z.array(z.number()),
  probability: z.number(),
});

const locationChangedEventSchema = baseEventSchema.extend({
  absoluteCoordinates: z.array(z.number()),
});

const supportNeededEventSchema = baseEventSchema.extend({
  type: z.literal(EntitiesEnum.SOLDIER),
  absoluteCoordinates: z.array(z.number()),
  supportType: z.nativeEnum(SupportTypesEnum),
  description: z.string(),
});

const speechEventSchema = baseEventSchema.extend({
  type: z.literal(EntitiesEnum.SOLDIER),
  target_id: z.string().optional(),
  text: z.string(),
});

const dartStatusUpdateSchema = baseEventSchema.extend({
  status: z.nativeEnum(DartStatusEnum),
});

const dartSchema = baseEntitySchema.extend({
  status: z.nativeEnum(DartStatusEnum),
  absoluteCoordinates: z.array(z.number()).optional(),
});

const dartDeploymentDroneSchema = baseEntitySchema.extend({
  type: z.literal(EntitiesEnum.DART_DEPLOYMENT_DRONE),
  status: z.nativeEnum(DroneStatusEnum),
  darts: z.array(dartSchema),
  batteryLevel: z.number(),
});

const dataReceiverDroneSchema = baseEntitySchema.extend({
  type: z.literal(EntitiesEnum.DATA_RECEIVER_DRONE),
  status: z.nativeEnum(DroneStatusEnum),
  pullTimes: z.array(z.number()),
  batteryLevel: z.number(),
});

const spawnEntityEventSchema = baseEventSchema.extend({
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
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
