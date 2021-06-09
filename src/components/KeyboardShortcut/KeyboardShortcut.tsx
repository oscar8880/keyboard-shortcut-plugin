import React, { Component } from 'react';

import { StateToProps, DispatchToProps } from './KeyboardShortcut.Container';

export interface Shortcut {
    keys: string[], action: () => void
}

type KeyboardShortcutProps = {
    shortcuts: Shortcut[]
} & StateToProps & DispatchToProps;

class KeyboardShortcut extends Component<KeyboardShortcutProps> {

    keyboardEventListener = (e: KeyboardEvent) => {
        const { key: pressedKey, type: eventType, repeat } = e;
        const { tagName } = (e.target as Element);

        console.log(pressedKey)

        // Check user is not inputting text
        if (tagName === "INPUT" || tagName === "TEXTAREA") {
            return;
        }

        // Check that this is the first key event
        if (repeat) return; 

        if(eventType === 'keydown') {
            this.props.shortcuts.forEach(shortcut => {
                const {keys, action} = shortcut;
                if(keys.every(key => {
                    return key === pressedKey || this.props.pressedKeys[key]
                })) {
                    action();
                    return;
                }
            })
        }
        
        if(this.props.pressedKeys[pressedKey] !== undefined) {
            const updatedPressedKeys = {...this.props.pressedKeys, [pressedKey]: eventType === 'keydown'};
            this.props.updateKeysPressed(updatedPressedKeys)
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyboardEventListener, true);
        window.addEventListener('keyup', this.keyboardEventListener, true);

        const initialKeys = this.props.shortcuts.reduce<{[key:string] : boolean}>((result, curr) => {
            curr.keys.forEach(key => result[key] = false)
            return result;
        }, {})

        this.props.updateKeysPressed(initialKeys)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardEventListener);
        window.removeEventListener('keyup', this.keyboardEventListener);
    }

    render() {
        return (
         <>
         </>
        );
      }
}

export default KeyboardShortcut;
