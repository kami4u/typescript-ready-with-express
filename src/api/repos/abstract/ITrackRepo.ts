import { ITrack } from "../../models/abstract/ITrack";

export interface ITrackRepo {
  /**
   * Add a new track record
   * @param track The given Track
   */
  add(track: ITrack): Promise<ITrack>;

  /**
   * Get all Tracks
   */
  getAll(): Promise<ITrack[]>;
}
