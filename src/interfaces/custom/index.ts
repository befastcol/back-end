export interface DocumentInterface {
  front?: string;
  back?: string;
}

export interface PointInterface {
  type: string;
  coordinates: [number, number];
  title?: string;
  subtitle?: string;
}
