---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Implementing a parent theme
description: Parent theme can speed up the process of customisations' development, providing an opportunity to customise customisations, keeping it as <a href='https://en.wikipedia.org/wiki/Don%27t_repeat_yourself'>DRY</a> as possible.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/development'
  title: Development

# Page navigation
page_nav:
    prev:
        content: Coding Standard
        url: '/docs/development/coding-standard'

---

ScandiPWA v3 (currently in beta) supports implementing parent themes, which allow extending some custom theme that extends vendor theme. This functionality is convenient if one likes to use *his own theme* that extends `scandipwa/source` as the project's base instead of `scandipwa/source` itself.

## A step-by-step algorithm of implementing a parent theme

1. Implement your custom theme, you can refer to [this guide](/docs/development/extension/).

2. Create a parent theme directory: `app/design/frontend/<vendor>/<themename>` or use the default `app/design/frontend/Scandiweb/pwa_parent`.

3. Reference that directory in the `scandipwa.json` file in the root of your project, field `parentRoot`. The path should be relative to `app/design/frontend` directory.

```javascript
{
    "parentRoot": "<vendor>/<themename>"
}
```

4. Move your custom theme's contents there (`mv -r pwa/* pwa_parent/*`) and then erase the `pwa` directory.

5. Restart the project in order to re-create the `pwa` folder from scratch.

6. If in your custom theme you had anything changed in the files that now populate the `pwa` directory, migrate the changes back.

7. Start implementing a theme on top of your theme! Work in the `pwa` directory just as you are used to.

8. Implement desired logic!

    - Extending files. First you need to import something you want to extend. To import files from parent theme use the alias `Parent<...>`, to import from source theme use the alias `Source<...>`. E.g. to import `AddToCart` component (and extend it) use the following:

    ```javascript
    // To extend source component
    import SourceAddToCart from 'SourceComponent/AddToCart';
    class AddToCart extends SourceAddToCart { ... }

    // Or to extend parent theme's component
    import ParentAddToCart from 'ParentComponent/AddToCart';
    class AddToCart extends ParentAddToCart { ... }
    ```

    - Using components. To import component and use it somewhere in your application (not to extend it) use the regular `Component/<ComponentName>` alias. When resolving a file, Fallback plugin is going to look in the following directories subsequently:

    1. Custom theme (`app/design/frontend/.../pwa`)
    2. Parent theme (`parentRoot` in scandipwa.json)
    3. Vendor theme (`src/scandipwa/source`)

