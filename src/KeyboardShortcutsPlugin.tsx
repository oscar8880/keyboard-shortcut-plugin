import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import KeyboardShortcut from './components/KeyboardShortcut/KeyboardShortcut.Container';
import { Shortcut } from 'components/KeyboardShortcut/KeyboardShortcut';

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

    const toggleSidebar = () => {
      flex.Actions.invokeAction("ToggleSidebar");
    }

    const toggleAvailability = () => {
      const { activity } = manager.store.getState().flex.worker;
      if(activity.name === "Offline" || activity.name === "Unavailable") {
        flex.Actions.invokeAction("SetActivity", { activityAvailable: true, activityName: "Available" })
      }
      if(activity.name === "Available") {
        flex.Actions.invokeAction("SetActivity", { activityAvailable: false, activityName: "Unavailable" })
      }
    }

    const selectTask = () => {
      const taskMap = manager.store.getState().flex.worker.tasks;
      const topTask = taskMap.keys().next().value;
      flex.Actions.invokeAction("SelectTask", { sid: topTask })
    }

    const acceptTask = () => {
      const taskMap = manager.store.getState().flex.worker.tasks;
      const topTask = taskMap.keys().next().value;
      flex.Actions.invokeAction("AcceptTask", { sid: topTask })
    }

    const hangupCall = () => {
      const taskMap = manager.store.getState().flex.worker.tasks;
      const topTask = taskMap.keys().next().value;
      flex.Actions.invokeAction("HangupCall", { sid: topTask })
    }

    const completeTask = () => {
      const taskMap = manager.store.getState().flex.worker.tasks;
      const topTask = taskMap.keys().next().value;
      flex.Actions.invokeAction("CompleteTask", { sid: topTask })
    }

    const keyShortcuts: Shortcut[] = [
      {keys: ['s'], action: toggleSidebar},
      {keys: ['Shift', 'T'], action: toggleSidebar}
    ]

    flex.RootContainer.Content.add(<KeyboardShortcut shortcuts={keyShortcuts} key="keyboard-shortcuts"/>)
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
