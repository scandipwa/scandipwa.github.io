---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: File Structure
description: Learn where to search and what to search.

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Tools of ScandiPWA
        url: '/docs/development/tools/'
    next:
        content: Data-flow diagram
        url: '/docs/development/data-flow/'

---

The theme is expected to be found in Magento's directory for themes: `app/design/frontend/<VENDOR>/<NAME>`. In docker, by default, the theme is located in `app/design/frontend/Scandiweb/pwa`.

> **Note**: do not worry that you see no source files (.js, .scss) in your theme. This is expected. You are meant to create files in the same folder with the same name in order to modify them. See [extension](/docs/development/extension/) guide for that.

The source theme (composer installed) is located in `vendor/scandipwa/source`. Reference it for efficient development. But do not modify the vendor files! Use the [extension](/docs/development/extension/) mechanism for that.

## Watch an explanation video

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/vrFJDLS-K3s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Observe Magento related files

Because the ScandiPWA is compiled to a valid Magento 2 theme, it must follow [Magento theme structure](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-structure.html).

> **Note**: initially `Magento_Theme` folder is empty. You have to compile the application - see the [FAQ](/setup/docker/faq?id=luma-theme-is-displayed).

```bash
📦base-theme
 ┣ 📂Magento_Theme # compiled assets
 ┃ ┣ 📂templates
 ┃ ┃ ┗ 📜root.phtml # root template compiled from "index.development.html" or "index.production.phtml"
 ┃ ┗ 📂web
 ┃   ┣ 📂assets # compiled from "src/public/assets"
 ┃   ┗ 📜*.(js|css) # compiled JS and CSS
 ┣ 📂etc # configuration
 ┃ ┣ 📜module.xml
 ┃ ┗ 📜view.xml
 ┣ 📂media # theme preview picture in admin panel
 ┃ ┗ 📜preview.png
 ┣ 📜registration.php # registration file
 ┗ 📜theme.xml # registration file
```

## Browse theme internals

The [modern application stack](/scandipwa/stack.md) fluidly merged with the [flat structure](/scandipwa/organization?id=flat-file-structure). Notice, the main folders are:

- **component** - React components
- **route** - application route collection
- **style** - application-wise styles
- **query** - queries for GraphQL requests
- **type** - common React propTypes declarations
- **store** - Redux store configuration
- **util** - application wise helpers

There are a lot of `index.js` file in the theme. Do not be afraid of them. Except few exceptions, they are just simple aliases to one of the files in the directory. Exceptions are:

- **app/route/index.js** - main router initialization
- **app/store/index.js** - reducer combination, Redux initialization
- **app/index.js** - application entry-point

Now, observe complete theme source-files related structure:

```bash
📦base-theme
 ┣ 📂node_modules # installed project dependencies (please add to `.gitignore`)
 ┣ 📂i18n
 ┃ ┗ 📜<LANGUAGE>_<VARIATION>.json
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┗ 📂<COMPONENT_NAME>
 ┃ ┃ ┃   ┣ 📜<COMPONENT_NAME>.component.js # template related logic
 ┃ ┃ ┃   ┣ 📜<COMPONENT_NAME>.container.js # business logic & Redux connection
 ┃ ┃ ┃   ┣ 📜<COMPONENT_NAME>.style.scss # styles
 ┃ ┃ ┃   ┣ 📜<COMPONENT_NAME>.config.js # configuration
 ┃ ┃ ┃   ┣ 📜<COMPONENT_NAME>.test.js # unit tests
 ┃ ┃ ┃   ┗ 📜index.js
 ┃ ┃ ┣ 📂query
 ┃ ┃ ┃ ┣ 📜<QUERY_NAME>.query.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂route
 ┃ ┃ ┃ ┣ 📂<ROUTE_NAME>
 ┃ ┃ ┃ ┃ ┣ 📜<ROUTE_NAME>.component.js
 ┃ ┃ ┃ ┃ ┣ 📜<ROUTE_NAME>.container.js
 ┃ ┃ ┃ ┃ ┣ 📜<ROUTE_NAME>.style.scss
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┣ 📂<STORE_NAME>
 ┃ ┃ ┃ ┃ ┣ 📜<STORE_NAME>.action.js # action declaration
 ┃ ┃ ┃ ┃ ┣ 📜<STORE_NAME>.dispatcher.js # action dispatcher (for async executions)
 ┃ ┃ ┃ ┃ ┣ 📜<STORE_NAME>.reducer.js # action handler
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📂abstract # virtual SASS functions, mixins (non compilable). Are injected into every component style!
 ┃ ┃ ┃ ┃ ┣ 📜_abstract.scss # imports of all abstract functions in right order
 ┃ ┃ ┃ ┃ ┗ 📜_<ABSTRACT_STYLE_PART>.scss
 ┃ ┃ ┃ ┣ 📂base
 ┃ ┃ ┃ ┃ ┣ 📜_<HTML_ELEMENT_NAME>.scss
 ┃ ┃ ┃ ┃ ┣ 📜_reset.scss # CSS reset
 ┃ ┃ ┃ ┃ ┗ 📜_root.scss # ":root" styles (CSS custom variables declaration)
 ┃ ┃ ┃ ┣ 📂cms
 ┃ ┃ ┃ ┃ ┣ 📂block
 ┃ ┃ ┃ ┃ ┃ ┗ 📜<CMS_BLOCK_NAME>.scss
 ┃ ┃ ┃ ┃ ┣ 📂slider
 ┃ ┃ ┃ ┃ ┃ ┗ 📜<SLIDER_NAME>.scss
 ┃ ┃ ┃ ┃ ┗ 📜block.scss
 ┃ ┃ ┃ ┗ 📜main.scss
 ┃ ┃ ┣ 📂type
 ┃ ┃ ┃ ┗ 📜<PROP_TYPE_GROUP>.js
 ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┗ 📂<UTILITY_GROUP_NAME>
 ┃ ┃ ┃ ┃ ┣ 📜<UTILITY_NAME>.js
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📜index.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

### Configuration & build files

> **TODO**: add notes about webpack configuration naming, explain babel configuration

```bash
📦base-theme
 ┣ 📂config
 ┃ ┣ 📂FallbackPlugin
 ┃ ┣ 📂I18nPlugin
 ┃ ┣ 📂TranslationFunction
 ┃ ┣ 📜babel.config.js
 ┃ ┣ 📜meta.config.js
 ┃ ┣ 📜tests.config.js
 ┃ ┣ 📜webmanifest.config.js
 ┃ ┣ 📜webpack.core.config.js
 ┃ ┣ 📜webpack.development.config.js
 ┃ ┣ 📜webpack.extract-translations.config.js
 ┃ ┣ 📜webpack.production.config.js
 ┃ ┗ 📜webpack.sw.config.js
 ┣ 📜jsconfig.json
 ┣ 📜process-core.yml
 ┣ 📜process.yml
 ┣ 📜.eslintrc
 ┣ 📜.stylelintrc
 ┗ 📜.graphqlconfig

```
