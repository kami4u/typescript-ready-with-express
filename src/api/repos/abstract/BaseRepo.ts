export abstract class BaseRepo {
  public async createModel() {
    this.createModels();
  }

  protected abstract createModels(): void;
}
