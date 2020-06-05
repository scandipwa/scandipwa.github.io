---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Coding Standard
description: Strict coding guidelines allow for more readable consistent code. Learn BEM, coding-style & more!

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/development'
  title: Development

# Page navigation
page_nav:
    prev:
        content: Debugging
        url: '/docs/development/debugging'
    next:
        content: Parent theme
        url: '/docs/development/parent-theme'

---

## Watch videos

Style (SCSS) best-practices:

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/W4LUYfLUCqs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>

Scripting (React) best-practices:

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/0tSXwEg26UA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## BEM

This project uses [BEM](https://en.bem.info/methodology/) (Block Element Modifier) approach to organize styles.

Following rules are true specifically in ScandiPWA project case:
- Blocks and elements start with uppercase: `Header`
- If block or element has 2 or more words in its name - they both start with uppercase: `MenuItem`
- Blocks and elements are divided with minus sign (`-`): `Header-MenuItem`
- Mods are divided with an underscore (`_`): `Header-MenuItem_visible`
- Mods start with lowercase
- Mods may consist of:
    - a key and a value: `MenuItem_type_dropdown` or `MenuItem_type_defaultLocal` if modifier has 2 or more words in its key or value.
    - a key without value included in the name: `MenuItem_visible`
- For boolean modifiers, the value is not included in the name: `MenuItem_visible`
- If mod has 2 or more words in its name - it is written as follows: `backgroundColor_red`
- Block's element can't be accessed from outside the block

### How to use it in Javascript?

This projects uses [rebem-jsx-plugin](https://github.com/rebem/rebem-jsx) to implement BEM in this project.

> **Note**: usage of `className` prop is prohibited.

#### Defining a block

```jsx
<div block="Header">

// Results into
<div className="Header">
```

#### Defining an element of a block

```jsx
<div block="Header" elem="Message">

// Results into
<div className="Header-Message">
```

#### Defining a block which is an element of parent block

> **Note**: string props are declared with double quotes (`"`), while the object keys are declared with single quotes (`'`).

```jsx
<div block="Menu" mix={ { block: 'Header', elem: 'Menu' }}>

// Results into
<div className="Menu Header-Menu">
```

#### Using `mods` (modificators) prop

- Boolean modifier

> **Note**: the prop name should start with `is` to immediately represent boolean

```jsx
<div block="Menu" mods={ { isVisible: true } }>

// Results into
<div className="Menu Menu_isVisible">
```

- Single key-value modifier

```jsx
<div block="Menu" mods={ { type: 'horizontal' } }>

// Results into
<div className="Menu Menu_type_horizontal">
```

- Multiple key -> value modifier

```jsx
<div block="Menu" mods={ { type: 'horizontal', behavior: 'autoClose' } }>

// Results into
<div className="Menu Menu_type_horizontal Menu_behavior_autoClose">
```

### How to use it in styles (SCSS)?

Let's consider following JSX snippet:

```jsx
<form class="Form Form_state_error">
    <div class="Field Form-Field">
        <span class="Field-Message">Error</span>
        <input class="Field-Input" name="default" placeholder="Please enter a value">
    </div>
</form>
```

- How to access block:

```scss
.Form {
    background-color: red;
}
```

- How to access block's element:

> **Note**: `&` stands for parent selector, it is very useful in order to not repeat yourself.

```scss
.Form {
    &-Field {
        background-color: blue;
    }
}
```

- How to access modified block's element:

```scss
.Form {
    &_state {
        &_error {
            .Field-Message {
                background-color: red;
            }
        }

        &_warning{
            .Field-Message {
                background-color: yellow;
            }
        }
    }
}
```

## Coding standard: description of ESLint rules

### `file-structure`
File structure must comply to the following guidelines:

  * File structure must be flat, meaning that nesting components inside of other components is prohibited.

  * Extending root directory `src` with custom folders is prohibited.

  * File structure regulations imply having files with certain postfixes for certain functionality parts. Allowed postfixes for directories are the following

    * Component and route: `.component` `.container` `.style` `.config` `.unstated`

    * Store: `.action` `.dispatcher` `.reducer`

    * Query: `.query`

    * Style, type: __none__

  * For files which are in their own directories with functionality related only to them (e.g routes, components), names should match the name of the directory these files are in.


### __`derived-class-names`__
Class name must match name of the file it is inside of.
Expected class names for all the files _other_ than components are `name + prefix` (e.g. class inside of __AddToCart.container__.js file must be called __AddToCartContainer__ and not otherwise).

Examples of **incorrect** code for this rule:

```js
// in MyComponent.container.js
class Abc { /** ... */ }

// in Hello.component.js
class HelloComponent { /** ... */ }
```

Examples of **correct** code for this rule:

```js
// in MyComponent.container.js
class MyComponentContainer { /** ... */ }

// in Hello.component.js
class Hello { /** ... */ }
```

### `use-extensible-base`
All components should be extensible. For class to be extensible it should be derived from extensible base. Replacements of non-extensible bases are the following and should not be imported - these are available in any point of the application.

  * `PureComponent` -> `ExtensiblePureComponent`

  * `Component` -> `ExtensibleComponent`

  * _`no base`_ -> `ExtensibleClass`


The `ExtensiblePureComponent`, `ExtensibleComponent` and `ExtensibleClass` requires no import.

Examples of **incorrect** code for this rule:

```js
import { PureComponent } from 'react';
class A extends PureComponent { /** ... */ }
```

Examples of **correct** code for this rule:

```js
// notice, no import, it is a global variable
class A extends ExtensiblePureComponent { /** ... */ }
```

### `only-one-class`
There should be only one class per file. Multiple classes inside of one file are not allowed.

Examples of **incorrect** code for this rule:

```js
// A.component.js
class A {
    /** ... */
}

class B {
    /** ... */
}
```

Examples of **correct** code for this rule:
```js
// A.component.js
class A {
    /** ... */
}
```

### `no-non-extensible-components`
Non-extensible components are not allowed. Use extensible bases instead of regular `Component` or `PureComponent`.

Examples of **incorrect** code for this rule:

```js
class A extends PureComponent {
    /** ... */
}
```

Examples of **correct** code for this rule:
```js
class A extends ExtensiblePureComponent{
    /** ... */
}
```

### `export-level-one`
Variables and classes if declared on root level must be exported (and not by default!)

Examples of **incorrect** code for this rule:

```js
const SOME_IMPORTANT_NUMBER = 777;

class A extends ExtensiblePureComponent {
    /** ... */
}
```

Examples of **correct** code for this rule:
```js
export const SOME_IMPORTANT_NUMBER = 777;

export class A extends ExtensiblePureComponent{
    /** ... */
}
```


### `use-middleware`
Wrap default export classes in `middleware` function in order to make classes extensible and assign namespaces to them.

Examples of **incorrect** code for this rule:

```js
// Component/A/A.component.js
export default A;
// Route/B/B.container.js
export default connect(mapStateToProps, mapDispatchToProps)(BContainer)
```

Examples of **correct** code for this rule:
```js
// Component/A/A.component.js
export default middleware('Component/A/Component', A);
// Route/B/B.container.js
export default middleware('Route/B/Container', BContainer);
```