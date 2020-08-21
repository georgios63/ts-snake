import { InstanceReference } from './types';

const gameInstances: Map<string, InstanceReference> = new Map();

export default class InstanceManager {
  static getInstance = (instanceId: string) => (
    gameInstances.get(instanceId)
  )

  static registerInstance = (instanceRef: InstanceReference) => {
    gameInstances.set(instanceRef.id, instanceRef);
  }

  static removeInstance = (instanceId: string) => {
    gameInstances.delete(instanceId);
  }
}
