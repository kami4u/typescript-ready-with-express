import { Router, Response, Request } from "express";
const router = Router();

import { asyncRoute } from "../utils/async";
import { GetZoneController } from "../controllers/zones/GetZoneController";

router.get(
  "/",
  asyncRoute(async (req: Request, res: Response) => new GetZoneController().execute(req, res))
);

export default router;
