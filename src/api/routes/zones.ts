import { Router, Response, Request, NextFunction } from "express";
const router = Router();

import { asyncRoute } from "../utils/async";
import { GetZoneController } from "../controllers/zones/GetZoneController";

router.get(
  "/",
  asyncRoute((req: Request, res: Response, next: NextFunction) => new GetZoneController().execute(req, res, next))
);

export default router;
