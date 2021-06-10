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

    const acceptSelectedTask = () => {
      const { selectedTaskSid } = manager.store.getState().flex.view
      if(selectedTaskSid) {
        flex.Actions.invokeAction("AcceptTask", { sid: selectedTaskSid })
      }
    }

    const hangupCall = () => {
      const { selectedTaskSid } = manager.store.getState().flex.view
      if(selectedTaskSid) {
        flex.Actions.invokeAction("HangupCall", { sid: selectedTaskSid })
      }
    }

    const completeTask = () => {
      const { selectedTaskSid } = manager.store.getState().flex.view
      if(selectedTaskSid) {
        flex.Actions.invokeAction("CompleteTask", { sid: selectedTaskSid })
      }
    }

    const selectNextTask = () => {
      const { tasks } = manager.store.getState().flex.worker;
      const { selectedTaskSid } = manager.store.getState().flex.view

      if(selectedTaskSid) {
        const taskIDs = Array.from(tasks.keys());
        const currentIndex = taskIDs.indexOf(selectedTaskSid);
        const nextIndex = currentIndex === taskIDs.length - 1 ? 0 : currentIndex + 1;

        flex.Actions.invokeAction("SelectTask", { sid: taskIDs[nextIndex] })
      } else {
        const topTask = tasks.keys().next().value;
        flex.Actions.invokeAction("SelectTask", { sid: topTask })
      }
    }

    const selectPreviousTask = () => {
      const { tasks } = manager.store.getState().flex.worker;
      const { selectedTaskSid } = manager.store.getState().flex.view

      if(selectedTaskSid) {
        const taskIDs = Array.from(tasks.keys());
        const currentIndex = taskIDs.indexOf(selectedTaskSid);
        const previousIndex = currentIndex === 0 ? taskIDs.length - 1 : currentIndex - 1;

        flex.Actions.invokeAction("SelectTask", { sid: taskIDs[previousIndex] })
      } else {
        const topTask = tasks.keys().next().value;
        flex.Actions.invokeAction("SelectTask", { sid: topTask })
      }
    }

    const keyShortcuts: Shortcut[] = [
      {keys: ['s'], action: toggleSidebar},
      {keys: ['`'], action: selectNextTask},
      {keys: ['Shift', '~'], action: selectPreviousTask},
      {keys: ['a'], action: acceptSelectedTask},
      {keys: ['o'], action: toggleAvailability},
      {keys: ['h'], action: hangupCall},
      {keys: ['c'], action: completeTask}
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
