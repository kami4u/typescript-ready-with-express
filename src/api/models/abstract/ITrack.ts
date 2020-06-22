export interface ITrack {
  userId: string;
  name: string;
  locations: [IPoint];
}

export interface IPoint {
  timestamp: number;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    heading: number;
    speed: number;
  };
}
