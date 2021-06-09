import { AppState } from '../../states';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Actions, PressedKeys } from '../../states/KeyboardShortcutState';
import KeyboardShortcut from './KeyboardShortcut';

export interface StateToProps {
  pressedKeys: PressedKeys;
}

export interface DispatchToProps {
    updateKeysPressed: (pressedKeys: PressedKeys) => void;
}

const mapStateToProps = (state: AppState): StateToProps => ({
  pressedKeys: state['keyboard-shortcuts'].keyboardShortcut.pressedKeys,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  updateKeysPressed: bindActionCreators(Actions.updateKeysPressed, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardShortcut);
