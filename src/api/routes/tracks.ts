import { Router, Response, Request, NextFunction } from "express";
const router = Router();

import { asyncRoute } from "../utils/async";
import { GetTracksController } from "../controllers/tracks/GetTracksController";
import { CreateTrackController } from "../controllers/tracks/CreateTrackController";
import { TrackRepo } from "../repos/TrackRepo";

router.get(
  "/",
  asyncRoute((req: Request, res: Response, next: NextFunction) => new GetTracksController(new TrackRepo()).execute(req, res, next))
);

router.post(
  "/",
  asyncRoute((req: Request, res: Response, next: NextFunction) => new CreateTrackController(new TrackRepo()).execute(req, res, next))
);

export default router;
