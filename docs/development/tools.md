---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Tools of ScandiPWA
description: Make sure your development tools are configured!

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    next:
        content: File Structure
        url: '/docs/development/file-structure/'
---

## VSCode

The tools and editors are essential. For PHP - there is a standard "PHPStorm" for React development we encourage using [VSCode](https://code.visualstudio.com/). This is a very popular code editor, with a powerful extension API. We even [have our own](https://github.com/scandipwa/scandipwa-development-toolkit) to help you develop your store faster! Watch the video to configure your editor!

<iframe width="560" height="315" src="https://www.youtube.com/embed/hmzcmb611x0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The  VSCode extensions mentioned:
- [Better comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) - the comment highlights
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - write without typos
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - remote debugger for chrome
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - JS code-style validator
- [GitLense](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - better Git integration
- [ScandiPWA VSCode snippets](https://github.com/scandipwa/scandipwa-development-toolkit) - ScandiPWA extension helper
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - SCSS code-style validator
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) - left-over spaces highlighter

## ESLint and StyleLint - code-style validators

Matching code-style is very important. The consistent tabulation, the proper imports, everything matters! We even made [our own ESLint plugin](https://www.npmjs.com/package/@scandipwa/eslint-plugin-scandipwa-guidelines) (for the next ScandiPWA version)!

> **Note**: it is mandatory to install the ESLint and StyleLint! This will help a lot later, when inspecting the source code or contributing! Please do not skip this step!

<iframe width="560" height="315" src="https://www.youtube.com/embed/3nO6m4zDnqs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Chrome remote Debugging

Configuring the remote debugging can be quite challenging. Debugging in the browser requires additional tools. Watch the tutorial video, and configure your Chrome and VSCode for remote debugging.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cyDwoVLH_hA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Chrome extensions mentioned in this video:
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - the component state & props inspector
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - the global state inspection tool

## GraphQL Playground

Knowing the GraphQL schema is important. Using reliable tools from the very begging is crucial for fast delivery. Install them beforehand.

<iframe width="560" height="315" src="https://www.youtube.com/embed/27IHNDG4Kaw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The tools mentioned in the video:
- [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) - the best GraphQL schema editor
- [Postman](https://www.postman.com/) - the best API explorer
