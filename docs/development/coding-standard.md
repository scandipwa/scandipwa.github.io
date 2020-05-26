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

## Coding standard

> **Note**: please refer to the [old documentation](https://github.com/scandipwa/docs/blob/master/theme/08-Standard.md) while we are preparing the new guide. It will be based on ESLint rules, we plan on automating the coding standards & styles.
