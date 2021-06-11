import { Action } from './index';

const ACTION_UPDATE_KEYS_PRESSED = 'UPDATE_KEYS_PRESSED';
const ACTION_OPEN_GUIDE_MODAL = 'OPEN_GUIDE_MODAL';
const ACTION_CLOSE_GUIDE_MODAL = 'CLOSE_GUIDE_MODAL';

export interface PressedKeys {
    [key:string]: boolean
}

export interface KeyboardShortcutState {
    pressedKeys: PressedKeys;
    isGuideModalOpen: boolean;
}

const initialState: KeyboardShortcutState = {
    pressedKeys: {},
    isGuideModalOpen: false
};

export class Actions {
  public static updatePressedKeys = (pressedKeys: PressedKeys): Action => ({ type: ACTION_UPDATE_KEYS_PRESSED, payload: pressedKeys});
  public static openGuideModal = (): Action => ({ type: ACTION_OPEN_GUIDE_MODAL});
  public static closeGuideModal = (): Action => ({ type: ACTION_CLOSE_GUIDE_MODAL});
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

    case ACTION_OPEN_GUIDE_MODAL: {
      return {
        ...state,
        pressedKeys: {
          ...state.pressedKeys
        },
        isGuideModalOpen: true
      }
    }

    case ACTION_CLOSE_GUIDE_MODAL: {
      return {
        ...state,
        pressedKeys: {
          ...state.pressedKeys
        },
        isGuideModalOpen: false
      }
    }

    default:
      return state;
  }
}
