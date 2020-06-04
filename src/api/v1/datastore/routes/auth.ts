import { Router, Response, Request } from "express";
import { AddUserController } from "../controllers/auth/AddUserController";
import { asyncRoute } from "../../../utils/async";
import { UserRepo } from "../repos/UserRepo";
import { GetUsersController } from "../controllers/auth/GetUsersController";
const router = Router();

router.post(
  "/",
  asyncRoute(async (req: Request, res: Response) => new AddUserController(new UserRepo()).execute(req, res))
);

router.get(
  "/",
  asyncRoute(async (req: Request, res: Response) => new GetUsersController(new UserRepo()).execute(req, res))
);

export default router;
