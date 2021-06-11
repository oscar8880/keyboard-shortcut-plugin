import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import KeyboardShortcut from './components/KeyboardShortcut/KeyboardShortcut.Container';
import KeyboardShortcutManager from './KeyboardShortcutManager';
import { IconButton } from '@twilio/flex-ui';
import { Actions } from './states/KeyboardShortcutState';

const PLUGIN_NAME = 'KeyboardShortcutsPlugin';

export default class KeyboardShortcutsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    this.registerReducers(manager);

    const shortcutManager = new KeyboardShortcutManager(flex, manager);

    shortcutManager.addShortcut(['g'], shortcutManager.toggleGuide.bind(shortcutManager));
    shortcutManager.addShortcut(['s'], shortcutManager.toggleSidebar.bind(shortcutManager));
    shortcutManager.addShortcut(['`'], shortcutManager.selectNextTask.bind(shortcutManager));
    shortcutManager.addShortcut(['Shift', '~'], shortcutManager.selectPreviousTask.bind(shortcutManager));
    shortcutManager.addShortcut(['a'], shortcutManager.acceptSelectedTask.bind(shortcutManager));
    shortcutManager.addShortcut(['o'], shortcutManager.toggleAvailability.bind(shortcutManager));
    shortcutManager.addShortcut(['e'], shortcutManager.endCall.bind(shortcutManager));
    shortcutManager.addShortcut(['m'], shortcutManager.muteCall.bind(shortcutManager));
    shortcutManager.addShortcut(['h'], shortcutManager.holdCall.bind(shortcutManager));
    shortcutManager.addShortcut(['u'], shortcutManager.unholdCall.bind(shortcutManager));
    shortcutManager.addShortcut(['c'], shortcutManager.completeTask.bind(shortcutManager));
    shortcutManager.addShortcut(['w'], shortcutManager.wrapuptask.bind(shortcutManager));

    flex.RootContainer.Content.add(<KeyboardShortcut shortcuts={shortcutManager.shortcuts} key="keyboard-shortcuts"/>)
    flex.MainHeader.Content.add(<IconButton onClick={() => manager.store.dispatch(Actions.openGuideModal())} key="keyboard-shortcuts-guide" icon="IcnInfo"/>,  { sortOrder: 1 } )
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // tslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
