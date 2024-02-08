export interface DocumentInterface {
  front?: string;
  back?: string;
}

export interface PointInterface {
  coordinates: [number, number];
  title: string;
  subtitle: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}
