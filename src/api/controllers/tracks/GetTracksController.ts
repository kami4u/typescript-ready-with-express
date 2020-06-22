import BaseController from "../BaseController";
import { ITrackRepo } from "../../repos/abstract/ITrackRepo";

export class GetTracksController extends BaseController {
  private trackRepo: ITrackRepo;

  constructor(trackRepo: ITrackRepo) {
    super();
    this.trackRepo = trackRepo;
  }
  protected async executeImpl(): Promise<any> {
    const tracks = await this.trackRepo.getAll();
    return this.ok(tracks);
  }
}
