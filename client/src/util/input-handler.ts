export interface CustomKeyEvent {
  type: string;
  code: number;
  key: string;
  keyName: string;
  pressed: DynamicObject;
}

interface DynamicObject {
  [key: string]: any;
}

interface InputListener {
  (event: CustomKeyEvent): void;
}

class InputHandler {
  private keysPressed: DynamicObject;
  private keyBindings: DynamicObject;
  private listeners: Array<InputListener>;

  constructor() {
    this.keyBindings = {};
    this.keysPressed = {};
    this.listeners = [];

    this.setKeyListeners();
  }

  public add = (listener: InputListener) => this.listeners.push(listener)

  public remove = (listener: InputListener) => {
    this.listeners = this.listeners.filter((fn) => fn !== listener);
  }

  private toKeyName = (key: string) => {
    let keyName = '';
    const shortPrefix = 'K_';
    const longPrefix = 'KEY_';
    if (key.length < 3) {
      keyName = longPrefix + key.toUpperCase();
    } else {
      keyName = shortPrefix + key.toUpperCase();
    }
    return keyName;
  }

  private onKeyEvent = (e: KeyboardEvent) => {
    if (e.repeat) return;

    if (e.type === 'keydown') {
      this.keysPressed[e.keyCode] = {
        code: e.keyCode,
        name: e.key,
      };
    }

    if (e.type === 'keyup') {
      delete this.keysPressed[e.keyCode];
    }

    const keyEvent = {
      type: e.type,
      code: e.keyCode,
      key: e.key,
      keyName: this.toKeyName(e.key),
      pressed: { ...this.keysPressed },
    };

    this.listeners.forEach((listener) => listener(keyEvent));
  }

  private setKeyListeners = () => {
    window.addEventListener('keydown', this.onKeyEvent);
    window.addEventListener('keyup', this.onKeyEvent);
  }
}

export default new InputHandler();
