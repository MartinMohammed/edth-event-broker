// should it be entities or entity?
enum EntitiesEnum {
  TANK = "tank",
  SOLDIER = "soldier",
  DRONE = "drone",
  JAMMER = "jammer",
}

enum SupportTypesEnum {
  SUPPORT = "fightingSupport", // need more support
  MEDICAL = "medicalSupport", // need medical support
}

enum TopicsEnum {
  DETECTION = "detection",
  LOCATION_CHANGED = "locationChanged",
  SUPPORT_NEEDED = "supportNeeded",
  SPEECH = "speech",
}

// named export
export { EntitiesEnum, SupportTypesEnum, TopicsEnum };
