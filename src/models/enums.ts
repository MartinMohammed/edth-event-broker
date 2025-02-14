// should it be entities or entity?
enum EntitiesEnum {
  TANK = "tank",
  SOLDIER = "soldier",
  DATA_RECEIVER_DRONE = "dataReceiverDrone",
  DART_DEPLOYMENT_DRONE = "dartDeploymentDrone",
  JAMMER = "jammer",
  DART = "dart",
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
  DART_STATUS_UPDATE = "dartStatusUpdate",
}

enum DartStatusEnum {
  NOT_PLANTED = "notPlanted",
  PLANTED = "planted",
  NOT_RESPONDING = "notResponding", // wait for three pulse beats before transitioning to destroyed
  DESTROYED = "destroyed",
}

enum DroneStatusEnum {
  IDLE = "idle",
  FLYING = "flying",
  LANDED = "landed",
}

// named export
export {
  EntitiesEnum,
  SupportTypesEnum,
  TopicsEnum,
  DartStatusEnum,
  DroneStatusEnum,
};
