import React from 'react';
import { mount } from 'enzyme';

import KeyboardShortcut from '../KeyboardShortcut/KeyboardShortcut';

const defaultProps = {
  shortcuts: [
    {
      keys: ['a'],
      action: () => console.log('A key pressed')
    }
  ],
  pressedKeys: {},
  updatePressedKeys: () => {},
  isGuideModalOpen: false,
  openGuideModal: () => {},
  closeGuideModal: () => {},
};

describe('KeyboardShortcutComponent', () => {
  it('should trigger an action when the relevant key is pressed ', () => {
    const testAction = jest.fn();
    const shortcuts = [
      {
        keys: ['a'],
        action: testAction
      }
    ]
    const wrapper = mount(<KeyboardShortcut {...{...defaultProps, shortcuts: shortcuts}}/>);
    wrapper.render();
    const event = new KeyboardEvent('keydown', {'key': 'a'});
    document.dispatchEvent(event);

    expect(testAction).toHaveBeenCalled();
  });

  it('should trigger an action when the relevant 2 keys are pressed ', () => {
    const testAction = jest.fn();
    const shortcuts = [
      {
        keys: ['Shift', 'A'],
        action: testAction
      }
    ]
    const wrapper = mount(<KeyboardShortcut {...{...defaultProps, shortcuts: shortcuts, pressedKeys: { Shift: true }}}/>);
    wrapper.render();
    const event = new KeyboardEvent('keydown', {'key': 'A'});
    document.dispatchEvent(event);

    expect(testAction).toHaveBeenCalled();
  });

  it('should not trigger an action when an irrelevant key is pressed ', () => {
    const testAction = jest.fn();
    const shortcuts = [
      {
        keys: ['a'],
        action: testAction
      }
    ]
    const wrapper = mount(<KeyboardShortcut {...{...defaultProps, shortcuts: shortcuts}}/>);
    wrapper.render();
    const event = new KeyboardEvent('keydown', {'key': 'b'});
    document.dispatchEvent(event);

    expect(testAction).not.toHaveBeenCalled();
  });

  it('should render keyboard shortcut guide if isGuideModalOpen is true', () => {
    const wrapper = mount(<KeyboardShortcut {...{...defaultProps, isGuideModalOpen: true}}/>);
    expect(wrapper.render().text()).toMatch('Keyboard Shortcuts Help');
  });

  it('should not render keyboard shortcut guide if isGuideModalOpen is false', () => {
    const wrapper = mount(<KeyboardShortcut {...{...defaultProps, isGuideModalOpen: false}}/>);
    expect(wrapper.render().text()).not.toMatch('Keyboard Shortcuts Help');
  });
});
