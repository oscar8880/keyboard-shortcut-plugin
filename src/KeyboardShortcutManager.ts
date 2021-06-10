import { Flex } from "@twilio/flex-ui/src/FlexGlobal";

export interface KeyBoardShortcutRule {
    keys: string[], action: () => void
}

class KeyBoardShortcutManager {
    private flex: typeof Flex;
    private manager: Flex.Manager;
    public shortcuts: KeyBoardShortcutRule[];

    constructor(flex: typeof Flex, manager: Flex.Manager) {
        this.flex = flex;
        this.manager = manager;
        this.shortcuts = [];
    }

    public addShortcut = (keys: string[], action: () => void) => {
        this.shortcuts = [...this.shortcuts, {keys: keys, action: action}];
    }

    public toggleSidebar = () => {
        this.flex.Actions.invokeAction("ToggleSidebar");
    }
  
    public toggleAvailability = () => {
        const { activity } = this.manager.store.getState().flex.worker;
        if(activity.name === "Offline" || activity.name === "Unavailable") {
            this.flex.Actions.invokeAction("SetActivity", { activityAvailable: true, activityName: "Available" })
        }
        if(activity.name === "Available") {
            this.flex.Actions.invokeAction("SetActivity", { activityAvailable: false, activityName: "Unavailable" })
        }
    }

    public acceptSelectedTask = () => {
        const { selectedTaskSid } = this.manager.store.getState().flex.view
        if(selectedTaskSid) {
            this.flex.Actions.invokeAction("AcceptTask", { sid: selectedTaskSid })
        }
    }

    public hangupCall = () => {
        const { selectedTaskSid } = this.manager.store.getState().flex.view
        if(selectedTaskSid) {
            this.flex.Actions.invokeAction("HangupCall", { sid: selectedTaskSid })
        }
    }

    public completeTask = () => {
        const { selectedTaskSid } = this.manager.store.getState().flex.view
        if(selectedTaskSid) {
            this.flex.Actions.invokeAction("CompleteTask", { sid: selectedTaskSid })
        }
    }

    public selectNextTask = () => {
        const { tasks } = this.manager.store.getState().flex.worker;
        const { selectedTaskSid } = this.manager.store.getState().flex.view

        if(selectedTaskSid) {
            const taskIDs = Array.from(tasks.keys());
            const currentIndex = taskIDs.indexOf(selectedTaskSid);
            const nextIndex = currentIndex === taskIDs.length - 1 ? 0 : currentIndex + 1;

            this.flex.Actions.invokeAction("SelectTask", { sid: taskIDs[nextIndex] })
        } else {
            const topTask = tasks.keys().next().value;
            this.flex.Actions.invokeAction("SelectTask", { sid: topTask })
        }
    }

    public selectPreviousTask = () => {
        const { tasks } = this.manager.store.getState().flex.worker;
        const { selectedTaskSid } = this.manager.store.getState().flex.view

        if(selectedTaskSid) {
            const taskIDs = Array.from(tasks.keys());
            const currentIndex = taskIDs.indexOf(selectedTaskSid);
            const previousIndex = currentIndex === 0 ? taskIDs.length - 1 : currentIndex - 1;

            this.flex.Actions.invokeAction("SelectTask", { sid: taskIDs[previousIndex] })
        } else {
            const topTask = tasks.keys().next().value;
            this.flex.Actions.invokeAction("SelectTask", { sid: topTask })
        }
    }
}

export default KeyBoardShortcutManager;