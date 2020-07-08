---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Upgrading to the latest version
description: We make ScandiPWA better each day and this is a way to get the best version available.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/installation'
  title: Installation

---

> **Note**: Some changes are not backwards-compatible, if you update to the latest version and you have customisations depending on an old version, they might stop working properly. Fixing this usually does not take a lot of time, nevertheless bear that in mind when updating.

## Getting the latest minor release

1. Update the theme in `vendor`

    ```bash
    # Update the theme and all of its dependencies
    composer update scandipwa/*
    ```

2. If the release note says something has been changed in the configuration, manually update the `src/config` folder in your customisations folder (default `app/design/frontend/.....`), merging in all the changes from the new version. This process does not happen automatically. Be careful when doing that, the project may not work at all or work incorrectly with broken configuration. If the project does not work after an upgrade, outdated `config` folder is often the cause.

3. Read the release note and determine whether some other action is required in terms of refactoring your code corresponding to the new functionality. This will be the case for ScandiPWA v3 and its new plugin mechanism.

4. Fix all the non backwards compatible changes breaking your project by reviewing your modifications on top of them.

## Getting the latest major release

1. Update the `scandipwa/installer` dependency in your `src/composer.json`.

    > **Note**: Remember about the `minimum-stability` setting, if you wish to install a pre-release version.

2. Launch the project and run the following command

    ```bash
    composer install
    ```

3. Go through all the steps of updating to the latest minor except the first one.