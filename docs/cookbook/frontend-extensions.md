---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Creating the frontend extension
description: Implement easily-pluggable extensions for frontend.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/cookbook'
  title: Cookbook

# Page navigation
page_nav:
    prev:
        content: Base template
        url: '/docs/cookbook/base-template'
    next:
        content: Creating resolver
        url: '/docs/cookbook/creating-resolver'

---

ScandiPWA supports frontend extensions, which allow plugging into ScandiPWA functionality very similarly to Magento plugins. This guide is devoted to key things you should know when creating such extension.

## Watch the tutorial

TODO

## General rule

Start with understanding how do you wish to change ScandiPWA logic. Find the places which you'd change with your custom logic. Let's say you have the following class and you want to change it's behavior.

```javascript
export class SampleClass extends ExtensibleClass {
    simpleFunction(x) {
        console.log(`I am a simple function! And this is my argument: ${x}!`);
    }

    arrowFunction = (x) => {
        console.log(`I am an arrow function! My argument is ${x}!`);
    }

    property = {
        something: "Something",
        nothing: "Nothing"
    };

    showProperty() {
        console.log(property);
    }
}

export default middleware(SampleClass, 'SomeNamespace/SampleClass');
```

1. The thing that needs to be done first of all is creation of a composer package. Inside of it, in `src/scandipwa/plugin` you create `Awesome.plugin.js` file. Multiple can be created if functionally and logically separate parts of ScandiPWA need to be plugged into.

2. In there, you should create a class `AwesomePlugin`, it's members are meant to wrap around the `SampleClass` members and change their behavior.
>**Note: It is recommended to stick to the naming convention regarding the arguments of these functions.**

Each member that wraps around a **_function_** has the following arguments.
- `args` is an array of original arguments that are passed to the function this one is wrapped around.
- `callback` is function that calls the next plugin if there is one, or the original method, when all plugins defined for this method are applied.
- `instance` references the object you are plugging into.

Each member that is meant to change a **_property_**  has the following arguments:
- `originalMember` is the original member you are plugging into.
- `instance` references the object you are plugging into.

```javascript
    // This wraps around function, logs the arguments and adds one to the first argument
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

3. Create the configuration in your `.plugin.js` file. This object must be a default export. The following things are defined in this configuration:
- Which namespace are you plugging into
- Are you plugging into a _class_ or an _instance_?
    - _'Class construct'_ plugins change classes in the moment of their instantiation. This enables changing class **static members**, which are not available neither on instances nor on prototypes. Also this is an approach to change **properties**, which are never available on prototypes, e.g. state in a way it's defined throughout the ScandiPWA (`state = { ... }`).
    - _'Instance get'_ plugins intercept calls to instances' members. These plugins are used to change the behavior of regular functions, available on the instance.
- Which class member are you plugging in. Types of members adviced for each plugin type are described above.
- Position, in which this plugin will be called. There may be multiple plugins for a single member, the closer the position to 0 - the sooner this plugin will be called.

> **Note: you can create class members that do not exist in the original classes and they will be called, e.g. `componentDidUpdate`**

Configuration must follow this format:

```javascript
const config = {
    namespace: {
        'instance': {
            'get': {
                'methodName': [
                    {
                        position: X,
                        implementation: pluginInstance.memberName
                    }
                ]
            }
        },
        'class': {
            'construct': {
                'propertyName': [
                    {
                        position: X,
                        implementation: pluginInstance.memberName
                    }
                ]
            }
        }
    }
}
```

4. Activate your plugin. In the FE root of your theme, there is a file called **TODO**. It is responsible for theme's configuration. Active plugins should be defined there. The format for the extensions' block of this file is the following:
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