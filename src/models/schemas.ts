// Create schemas for all the events and all the properties of the events

import { z } from "zod";
import { EntitiesEnum, SupportTypesEnum, TopicsEnum } from "./enums";

// please list example format of the timestamp
// 2024-01-01T00:00:00.000Z
const isoTimestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const baseEventSchema = z.object({
  topic_name: z.nativeEnum(TopicsEnum),
  entity_id: z.string(),
  timestamp: z.string().regex(isoTimestampRegex),
});

// Base event schema
const detectionEventSchema = baseEventSchema.extend({
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  probability: z.number(),
});

const locationChangedEventSchema = z.object({
  topic_name: z.literal(TopicsEnum.LOCATION_CHANGED),
  absoluteCoordinates: z.array(z.number()),
});

const supportNeededEventSchema = z.object({
  topic_name: z.literal(TopicsEnum.SUPPORT_NEEDED),
  type: z.nativeEnum(EntitiesEnum),
  absoluteCoordinates: z.array(z.number()),
  supportType: z.nativeEnum(SupportTypesEnum),
  description: z.string(),
});

const speechEventSchema = z.object({
  topic_name: z.literal(TopicsEnum.SPEECH),
  target_id: z.string().optional(),
  text: z.string(),
});

export {
  detectionEventSchema,
  locationChangedEventSchema,
  supportNeededEventSchema,
  speechEventSchema,
};
