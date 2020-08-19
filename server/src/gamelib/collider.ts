import Collision from './collision';
import { Rect2D } from './util';

type Shape = Rect2D | Array<Rect2D>;

export default class Collider {
  public shape: Rect2D | Array<Rect2D>;
  public ref: any;
  public isStaticObject: boolean;

  constructor(shape: Shape, parentReference: any, isStaticObject = true) {
    this.shape = shape;
    this.ref = parentReference;
    this.isStaticObject = isStaticObject;
    Collision.registerCollider(this);
  }

  public destroy = () => {
    Collision.unregisterCollider(this);
  }
}
