export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type DirectionRange = 0 | 1 | -1;

export type Direction = {
  x: DirectionRange;
  y: DirectionRange;
};

export type Part = {
  direction: Direction;
  rect: Rect;
}
