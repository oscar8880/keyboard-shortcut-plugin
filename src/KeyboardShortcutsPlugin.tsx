import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import KeyboardShortcut from './components/KeyboardShortcut/KeyboardShortcut.Container';
import KeyBoardShortcutManager, { KeyBoardShortcutRule } from './KeyboardShortcutManager';

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

    const shortcutManager = new KeyBoardShortcutManager(flex, manager);

    shortcutManager.addShortcut(['s'], shortcutManager.toggleSidebar);
    shortcutManager.addShortcut(['`'], shortcutManager.selectNextTask);
    shortcutManager.addShortcut(['Shift', '~'], shortcutManager.selectPreviousTask);
    shortcutManager.addShortcut(['a'], shortcutManager.acceptSelectedTask);
    shortcutManager.addShortcut(['o'], shortcutManager.toggleAvailability);
    shortcutManager.addShortcut(['h'], shortcutManager.hangupCall);
    shortcutManager.addShortcut(['c'], shortcutManager.completeTask);

    flex.RootContainer.Content.add(<KeyboardShortcut shortcuts={shortcutManager.shortcuts} key="keyboard-shortcuts"/>)
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
