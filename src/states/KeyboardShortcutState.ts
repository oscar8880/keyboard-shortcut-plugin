import { Action } from './index';

const ACTION_UPDATE_KEYS_PRESSED = 'UPDATE_KEYS_PRESSED';

export interface PressedKeys {
    [key:string]: boolean
}

export interface KeyboardShortcutState {
    pressedKeys: PressedKeys
}

const initialState: KeyboardShortcutState = {
    pressedKeys: {},
};

export class Actions {
  public static updateKeysPressed = (pressedKeys: PressedKeys): Action => ({ type: ACTION_UPDATE_KEYS_PRESSED, payload: pressedKeys});
}

export function reduce(state: KeyboardShortcutState = initialState, action: Action) {
  switch (action.type) {
    case ACTION_UPDATE_KEYS_PRESSED: {
        const updatedPressedKeys = {
                ...state.pressedKeys,
                ...action.payload
            }
        return {
        ...state,
        pressedKeys: updatedPressedKeys,
      };
    }

    default:
      return state;
  }
}
