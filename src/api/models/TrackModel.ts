import mongoose from "mongoose";
import { ITrack } from "./abstract/ITrack";

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: "" },
  locations: [pointSchema],
});

export interface ITrackModel extends ITrack, mongoose.Document {}
export const createModel = () => mongoose.model<ITrackModel>("Track", trackSchema);
