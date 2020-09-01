export type Point = {
  x: number;
  y: number;
}

export type Box = {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

export type Rect2D = {
  x: { min: number; max: number };
  y: { min: number; max: number };
  origin: { x: number, y: number };
  width: number;
  height: number;
}
