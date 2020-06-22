import mongoose from "mongoose";
import { ITrackModel, createModel } from "../models/TrackModel";
import { ITrackRepo } from "./abstract/ITrackRepo";
import { ITrack } from "../models/abstract/ITrack";

export class TrackRepo implements ITrackRepo {
  private TrackModel: mongoose.Model<ITrackModel>;

  constructor() {
    this.TrackModel = createModel();
  }

  public async add(track: ITrack): Promise<ITrack> {
    const newTrack = new this.TrackModel(track);
    await newTrack.save();
    return newTrack.toObject();
  }

  public async getAll(): Promise<ITrack[]> {
    const tracks = await this.TrackModel.find();
    return tracks;
  }
}
