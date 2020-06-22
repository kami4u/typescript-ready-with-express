import { Router } from "express";
const router = Router();

import zones from "./zones";
import auth from "./auth";
import tracks from "./tracks";

router.use("/zones", zones);
router.use("/auth", auth);
router.use("/tracks", tracks);

export default router;
