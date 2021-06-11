import { KeyBoardShortcutRule } from 'KeyboardShortcutManager';
import React, { Component } from 'react';
import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@material-ui/core'

import { StateToProps, DispatchToProps } from './KeyboardShortcut.Container';
import { keyboardGuide } from './KeyboardShortcutGuide';

type KeyboardShortcutProps = {
    shortcuts: KeyBoardShortcutRule[]
} & StateToProps & DispatchToProps;

class KeyboardShortcut extends Component<KeyboardShortcutProps> {

    keyboardEventListener = (e: KeyboardEvent) => {
        const { key: pressedKey, type: eventType, repeat } = e;
        const { tagName } = (e.target as Element);

        // Check user is not inputting text
        if (tagName === "INPUT" || tagName === "TEXTAREA") {
            return;
        }

        // Check that this is a non-repeating key event
        if (repeat) return; 

        if(eventType === 'keydown') {
            for (const { keys, action } of this.props.shortcuts) {
                if (keys.every((key) => key === pressedKey || this.props.pressedKeys[key])) {
                  action();
                  break;
                }
              }
        }
        
        if(this.props.pressedKeys[pressedKey] !== undefined) {
            const updatedPressedKeys = {...this.props.pressedKeys, [pressedKey]: eventType === 'keydown'};
            this.props.updatePressedKeys(updatedPressedKeys)
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyboardEventListener, true);
        window.addEventListener('keyup', this.keyboardEventListener, true);


        const initialKeys = this.props.shortcuts.reduce<{[key:string] : boolean}>((result, curr) => {
            curr.keys.forEach(key => result[key] = false)
            return result;
        }, {})

        this.props.updatePressedKeys(initialKeys)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardEventListener);
        window.removeEventListener('keyup', this.keyboardEventListener);
    }

    render() {
        return (
            <Dialog open={this.props.isGuideModalOpen} onClose={this.props.closeGuideModal} fullWidth maxWidth="sm" onBackdropClick={this.props.closeGuideModal}>
                <DialogTitle>Keyboard Shortcuts Help</DialogTitle>
                <DialogContent>
                    <List>
                        {keyboardGuide.map((shortcut, i) => {
                            return (
                                <ListItem divider={i !== keyboardGuide.length - 1} key={shortcut.description}>
                                    <ListItemText>{shortcut.description}</ListItemText>
                                    <Typography align="right">
                                        {shortcut.keys}
                                    </Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        );
      }
}

export default KeyboardShortcut;
