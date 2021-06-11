import { AppState as FlexAppState } from '@twilio/flex-ui';
import { combineReducers, Action as ReduxAction } from 'redux';

import { KeyboardShortcutState, reduce as KeyboardShortcutReducer } from './KeyboardShortcutState';

// Register your redux store under a unique namespace
export const namespace = 'keyboard-shortcut-plugin';

// Extend this payload to be of type that your ReduxAction is
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  'keyboard-shortcut-plugin': {
    keyboardShortcut: KeyboardShortcutState;
  };
}

// Combine the reducers
export default combineReducers({
  keyboardShortcut: KeyboardShortcutReducer
});
