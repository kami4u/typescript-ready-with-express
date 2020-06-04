import { Router } from "express";
const router = Router();

import zones from "./routes/zones";
import auth from "./routes/auth";

router.use("/zones", zones);
router.use("/auth", auth);

export default router;
