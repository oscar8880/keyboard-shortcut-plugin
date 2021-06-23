# Keyboard Shortcut Plugin

An example plugin to demonstrate how keyboard shortcuts can be added to Twilio Flex. Includes keyboard shortcuts for common actions like selecting and accepting a task, changing agent availability, etc.

## Setup

1. Clone the repo to a directory of your choice.

2. Navigate into the repo:

```bash
cd keyboard-shortcut-plugin
```

3. Install dependencies:

```bash
npm install
```

4. Copy the example appConfig.js file:

```bash
cp public/appConfig.example.js public/appConfig.js
```

5. Start the plugin locally by running:

```bash
twilio flex:plugins:start
```

6. A Flex instance should now be running on localhost:3000. You might need to login to your Flex instance by clicking on the "Login with Twilio" link and logging in with your Twilio credentials.

## Usage

### Using keyboard shortcuts
Once the Plugin is running, you can open a guide to available shortcuts by pressing the 'G' key, or by clicking the info (i) button in the top right of the UI. There you will find a list of actions that can be triggered via the keyboard, and the key combinations required to trigger them.

### Adding a new shortcut
1.  Create a new public method on the `KeyboardShortcutManager` class which will execute the desired functionality of the keyboard shortcut. You can make use of the `flex` and `manager` properties to access the Flex store and interact with the Actions framework. If your desired functionality doesn't require access to the Flex store or Actions, the `KeyboardShortcutManager.addShortcutManager` function will take any function as its second argument.
```javascript
class  KeyboardShortcutManager {
	...
	public customAction() {
	    console.log('Hello from the keyboard!')
	}
	...
}
```

2. In the `init` function of `KeyboardShortcutPlugin` class you can now add your new shortcut by calling `shortcutManager.addShortcut` and providing an array of the keys required to trigger the shortcut, plus the function that you created in the previous step.
```javascript
class  KeyboardShortcutPlugin {
	... 
	init(flex: typeof  Flex, manager: Flex.Manager) {
		...
		shortcutManager.addShortcut(['k'], shortcutManager.customAction.bind(shortcutManager));
		...
	}
	...
}
```
*Note 1*: If you're using a `shortcutManager` method, ensure you bind the function to the `shortcutManager` instance by calling `bind(shortcutManager)`

*Note 2*: In cases where keys modify the value of other keys, such as Shift, subsequent keys should account for this to work as intended. For example:

`['Shift', 'K']` :heavy_check_mark:

`['Shift', 'k']` :x:

3.  Add the new shortcut to the `keyboardGuide` object in `src/components/KeyboardShortcut/KeyboardShortcutGuide.ts` so that it appears in the Keyboard Shortcuts Help guide

## Deployment

For details on how to deploy this, or any, Flex Plugin refer to this documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin#deploy-your-flex-plugin) page.

## Testing

Run tests with the following command:

```bash
twilio flex:plugins:test
```
