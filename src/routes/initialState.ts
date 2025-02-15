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
        id: "1",
        name: "Dart Deployment Drone",
        type: EntitiesEnum.DART_DEPLOYMENT_DRONE,
        status: DroneStatusEnum.IDLE,
        batteryLevel: 95,
        absoluteCoordinates: [0, 0, 0], // the drone is idle at the origin
        darts: [
          {
            id: "1",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 1",
          },
          {
            id: "2",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 2",
          },
          {
            id: "3",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 3",
          },
          {
            id: "4",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 4",
          },
          {
            id: "5",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
            name: "Dart 5",
          },
        ],
      },
      {
        id: "2",
        name: "Data Receiver Drone",
        type: EntitiesEnum.DATA_RECEIVER_DRONE,
        status: DroneStatusEnum.IDLE,
        pullTimes: [2, 14, 18, 22],
        absoluteCoordinates: [0, 5, 0], // the drone is idle at the origin
        pullStatuses: [true], // the first pull was successful, the other three were not initiated now
        batteryLevel: 94,
      },
    ],
  };
  res.json(initialState);
});

export default router;
