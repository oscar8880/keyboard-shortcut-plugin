# Keyboard Shortcuts Plugin

An example plugin to demonstrate how keyboard shortcuts can be added to Flex. Includes keyboard shortcuts for common actions like selecting and accepting a task, changing agent availability, etc.

## Setup

1. Clone the repo to a directory of your choice.

2. Navigate into the repo:

```bash
cd keyboard-shortcuts
```

2. Install dependencies by running `npm install`:

```bash
npm install
```

3. Start the plugin locally by running:

```bash
twilio flex:plugins:start
```

4. A Flex instance should now be running on localhost:3000. You might need to login to your Flex instance by clicking on the "Login with Twilio" link and logging in with your Twilio credentials.

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Usage

Once the Plugin is running, you can open a guide to available shortcuts by pressing the 'G' key, or by clicking the question mark in the top left of the UI. There you will find a list of actions that can be triggered via the keyboard, and the key combinations required to trigger them.

## Deployment

For details on how to deploy this, or any, Flex Plugin refer to this documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin#deploy-your-flex-plugin) page.

