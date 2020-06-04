import BaseController from "../BaseController";

export class GetZoneController extends BaseController {
  constructor() {
    super();
  }
  protected async executeImpl(): Promise<any> {
    return this.ok();
  }
}
