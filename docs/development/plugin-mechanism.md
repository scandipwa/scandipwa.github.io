---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Creating a ScandiPWA plugin
description: Implement a plugin with frontend functionality for ScandiPWA.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/development'
  title: Development

# Page navigation
page_nav:
    prev:
        content: Extension mechanism
        url: '/docs/development/extension'
    next:
        content: Debugging
        url: '/docs/development/debugging'

---

ScandiPWA supports frontend plugins, which allow reusing one piece of code throughout a lot of completely different projects. This guide is devoted to key things you should know when creating such extension.

## Watch an explanation video

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/9f6rpIrlNMk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Extension's file structure

ScandiPWA extension is M2 composer package with one extra directory - `scandipwa`. Inside of it ScandiPWA frontend-related functionality is stored. Any other M2 related folders with backend-related functionality can be stored in such package. You see `etc` and `Model` in this example, but these are not the only possible ones.

```bash
📦my-awesome-extension
 ┣ 📂src
 ┃ ┣ 📂etc
 ┃ ┃ ┗ # ...
 ┃ ┣ 📂Model
 ┃ ┃ ┗ # ...
 ┃ ┗ 📂scandipwa # Frontend-related functionality
 ┃   ┣ 📂 app    # Anything your extension needs on FE
 ┃   ┃ ┣ 📂component
 ┃   ┃ ┣ 📂query
 ┃   ┃ ┣ 📂route
 ┃   ┃ ┣ 📂store
 ┃   ┃ ┣ 📂util
 ┃   ┃ ┗ 📂app
 ┃   ┗ 📂 plugin # Plugging logic declarations
 ┃     ┗ 📜<SourceComponentName>.plugin.js
 ┗ 📜composer.json
```

## A step-by-step algorithm of creating a simple extension

This document is an addition to the video tutorial above. You are welcome to watch it in order to learn from an example. Start with understanding how you wish to change ScandiPWA logic. Find the places which need modification.

1. Create a `localmodules` directory in the magento root of your application. Then create a composer package there. Inside of it, in `src/scandipwa/plugin`, create `ComponentName.plugin.js` file, where `ComponentName` is name of the component you'd like to modify.

2. In there, you should create a class `ComponentNamePlugin`, its members are meant to wrap around the `SampleClass` members and be ran instead of the original members.

>**Note: It is recommended to stick to the naming convention regarding the arguments of these functions.**

Each member which wraps around a **_function_** has the following arguments.
- `args` is an array of original arguments that are passed to the function this one is wrapped around.

- `callback` is function that calls the next plugin if there is one, or the original method, when all plugins defined for this method are applied.

- `instance` references the object you are plugging into.

Each member which wraps around a **_property_**  has the following arguments:

- `originalMember` is the member you are plugging into.

- `instance` references the object you are plugging into.

```javascript
    // This wraps around the member function, logs the arguments and adds one to the first argument
    aroundFunction(args, callback, instance) {
        console.log(args); // [ ...arguments ]
        args[0] += 1;

        // The context must ALWAYS be passed to the callback, using 'apply' for that
        // Note that the original member (or the next plugin) will be called with changed arguments
        callback.apply(instance, args);
    }

    // This wraps around a property
    property(originalMember, instance) {
        return {
            ...originalMember,
            // And adds this new value to it
            someAddedValue: 'new value!'
        }
    }
```

3. Create the configuration in the bottom of `.plugin.js` file. This object must be a default export. The following things are defined in this configuration:

- Which namespace to modify

- Modify _class_ or _instance_

  - _'Instance get'_ plugins intercept calls to instance members. These plugins are used to change the behavior of functions, which available on the instance.

  - _'Class Get'_ plugins enable changing class **static members**.

  - _'Class Construct'_ is an approach to change **properties**, which are not available on prototypes, e.g. state in a way it's defined throughout the ScandiPWA (`state = { ... };`).

- Name of the member to modify

- Position, in which this plugin will be called. There may be multiple plugins for a single member if there are several extensions active in the application. The closer the position to 0 - the sooner it is called.

> **Note: you can create class members that do not exist in the original classes and they will be called as you'd expect writing them directly in the class, e.g. `componentDidUpdate`. Use _instance get_ plugins to do that in order not to overwrite any other plugin logic.**

Configuration must follow this format:

```javascript
const config = {
    namespace: {
        'instance': {
            'get': {
                'methodName': [
                    {
                        position: A, // number
                        implementation: B // function
                    }
                ]
            }
        },
        'class': {
            'construct': {
                'propertyName': [
                    {
                        position: E,
                        implementation: F
                    }
                ]
            },
            'get': {
                'staticMemberName': [
                    {
                        position: C,
                        implementation: D
                    }
                ]
            }
        }
    }
}
```

4. Activate your plugin. In the FE root of your theme, there is a file called `extensions.json`. It is responsible for theme's configuration. Active plugins should be defined there. The format for the extensions' block of this file is the following:
```javascript
{
    "extensions": {
        // Extension name should be picked by you, it can be anything.
        "ExtensionName": [
            "path/from/magento/root/to/plugin/file",
            "path/from/magento/root/to/another/one"
        ]
    }
}
```