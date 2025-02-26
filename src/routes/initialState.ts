// route for /api/initialState

import { Router } from "express";
import { EntitiesEnum, DroneStatusEnum, DartStatusEnum } from "../models/enums";
import { InitialState } from "../models/interfaces";

const router = Router();

router.get("/", (req, res) => {
  // add logging
  console.log("Initial state");
  // get the initial state for the frontend
  const initialState: InitialState = {
    entities: [
      {
        entityId: "dart-deployment-drone-1",
        name: "Dart Deployment Drone",
        type: EntitiesEnum.DART_DEPLOYMENT_DRONE,
        status: DroneStatusEnum.IDLE,
        batteryLevel: 95,
        absoluteCoordinates: [50, 50, 0], // the drone is idle at the origin
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        darts: [
          {
            entityId: "dart-1",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            entityId: "dart-2",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 2",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            entityId: "dart-3",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 3",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            entityId: "dart-4",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 4",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            entityId: "dart-5",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 5",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        entityId: "data-receiver-drone-1",
        name: "Data Receiver Drone",
        type: EntitiesEnum.DATA_RECEIVER_DRONE,
        status: DroneStatusEnum.IDLE,
        pullTimes: [2, 14, 18, 22],
        absoluteCoordinates: [70, 70, 0], // the drone is idle at the origin
        pullStatuses: [true], // the first pull was successful, the other three were not initiated now
        batteryLevel: 94,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };
  res.json(initialState);
});

export default router;
