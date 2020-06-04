import { Router } from "express";
const router = Router();

import zones from "./zones";
import auth from "./auth";

router.use("/zones", zones);
router.use("/auth", auth);

export default router;
