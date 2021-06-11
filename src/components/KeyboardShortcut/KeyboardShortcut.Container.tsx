import { AppState } from '../../states';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Actions, PressedKeys } from '../../states/KeyboardShortcutState';
import KeyboardShortcut from './KeyboardShortcut';

export interface StateToProps {
  pressedKeys: PressedKeys;
  isGuideModalOpen: boolean;
}

export interface DispatchToProps {
    updateKeysPressed: (pressedKeys: PressedKeys) => void;
    openGuideModal: () => void;
    closeGuideModal: () => void;
}

const mapStateToProps = (state: AppState): StateToProps => ({
  pressedKeys: state['keyboard-shortcut-plugin'].keyboardShortcut.pressedKeys,
  isGuideModalOpen: state['keyboard-shortcut-plugin'].keyboardShortcut.isGuideModalOpen
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  updateKeysPressed: bindActionCreators(Actions.updateKeysPressed, dispatch),
  openGuideModal: bindActionCreators(Actions.openGuideModal, dispatch),
  closeGuideModal: bindActionCreators(Actions.closeGuideModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardShortcut);
