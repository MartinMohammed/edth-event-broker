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
        type: EntitiesEnum.DART_DEPLOYMENT_DRONE,
        status: DroneStatusEnum.IDLE,
        batteryLevel: 95,
        absoluteCoordinates: [0, 0, 0], // the drone is idle at the origin
        darts: [
          {
            id: "1",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
          },
          {
            id: "2",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
          },
          {
            id: "3",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
          },
          {
            id: "4",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
          },
          {
            id: "5",
            type: EntitiesEnum.DART,
            status: DartStatusEnum.NOT_PLANTED,
          },
        ],
      },
      {
        id: "2",
        type: EntitiesEnum.DATA_RECEIVER_DRONE,
        status: DroneStatusEnum.IDLE,
        pullTimes: [2, 14, 18, 22],
        absoluteCoordinates: [0, 5, 0], // the drone is idle at the origin
        batteryLevel: 94,
      },
    ],
  };
  res.json(initialState);
});

export default router;
