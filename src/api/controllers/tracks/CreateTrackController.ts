import BaseController from "../BaseController";
import { ITrackRepo } from "../../repos/abstract/ITrackRepo";

export class CreateTrackController extends BaseController {
  private trackRepo: ITrackRepo;

  constructor(trackRepo: ITrackRepo) {
    super();
    this.trackRepo = trackRepo;
  }
  protected async executeImpl(): Promise<any> {
    const userId = this.req.user._id;
    const { name, locations } = this.req.body;

    const track = await this.trackRepo.add({ userId, name, locations });
    return this.ok(track);
  }
}
