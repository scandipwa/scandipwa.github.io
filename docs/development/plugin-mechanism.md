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

ScandiPWA v3 (currently not released) supports frontend plugins, which allow reusing one piece of code throughout a lot of completely different projects. This guide is devoted to key things you should know when creating such extension. This is a sneak peek and this functionality is not yet released.

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

2. In there, you should create a class `ComponentNamePlugin`, its members are meant to wrap around the `SampleClass` members and be ran instead of the original members. It is essential that wrapper members must be arrow functions, otherwise your plugin's context will not be available from inside of them.

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
    // It is essential that wrapper function is an arrow function!
    // Otherwise other member functions will not be available from it.
    aroundFunction = (args, callback, instance) => {
        console.log(args); // [ ...arguments ]
        args[0] += 1;

        // The context must ALWAYS be passed to the callback, using 'apply' for that
        // Note that the original member (or the next plugin) will be called with changed arguments
        callback.apply(instance, args);
    }

    // This wraps around a property
    property = (originalMember, instance) => {
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

  - _'instance get'_ plugins intercept calls to instance members. These plugins are used to change the behavior of functions, which available on the instance.

  - _'class get'_ plugins enable changing class **static members**.

  - _'class construct'_ is an approach to change **properties**, which are not available on prototypes, e.g. state in a way it's defined throughout the ScandiPWA (`state = { ... };`).

  - _'function apply'_ is an approach to change **functions** which are not class members, e.g. `mapStateToProps` or `mapDispatchToProps`.

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
                        position: C,
                        implementation: D
                    }
                ]
            },
            'get': {
                'staticMemberName': [
                    {
                        position: E,
                        implementation: F
                    }
                ]
            }
        },
        'function': {
            'apply': {
                {
                    position: G,
                    implementation: H
                }
            }
        }
    }
}
```

4. Activate your plugin. In the FE root of your theme, there is a file called `scandipwa.json`. It is responsible for theme's configuration. Active plugins should be defined there.

Contents:

- `<extension name>`: should be picked by you, it is not related to any functionality, just denotes which plugin files are meant for which extension. Put anything you like here.

- `<path>`: relative path from Magento root to `.plugin.js` file. Not that it's mandatory to have these paths in an array, even if only one is required for the extension.

The format for the 'extensions' block of this file is the following:
```javascript
{
    "extensions": {
        "<extension name>": [
            "<path1>",
            "<path2>"
        ]
    }
}
```

## Useful information

1. All plugin files can be overriden both in parent and custom theme. To do that you should put a file with the same name in `app/design/frontend/Scandiweb/pwa/src/plugin/<vendor>/<extension>/<path>`, where `<path>` is relative to `scandipwa` folder in project's frontend root. For example, to override file `awesome-extension-provider/paypal-graphql/src/scandipwa/app/component/PayPal/PayPal.component.js` you need to create a file `app/design/frontend/Scandiweb/pwa/src/plugin/awesome-extension-provider/paypal-graphql/app/component/PayPal/PayPal.component.js`. Note that override file's path is reduced and you shouldn't include child directories `src/scandipwa` in it, because everything that is able to be overriden with this approach is located in the extension's frontend root, which is `src/scandipwa`.

2. Referencing extension from the inside of it and from the outside of it can be done with an alias that is generated during the compilation. Alias is `<vendor name>_<extension name>` transformed to PascalCase and references the frontend root of specified extension. E.g. you can import files from `awesome-extension-provider/paypal-graphql` by using the following:

```javascript
import PayPal from 'AwesomeExtensionProvider_PaypalGraphql/component/PayPal';
// instead of
import PayPal from '../../../<some more iterations>/awesome-extension-provider/paypal-graphql/src/scandipwa/app/component/PayPal';
```

3. ScandiPWA extensibility allows **plugging into plugins**. All classes that your plugin requires should be assigned namespaces by wrapping them into the `middleware` function. The only exception is that plugin class in `.plugin.js` file cannot be plugged into due to configuration builder's limitations. It still can be overriden as described above though.

