---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Setting up the theme with remote M2 server
description: This type of installation is helpful, when your aim is NOT to develop a backend functionality, rather only modify frontend.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/installation'
  title: Installation

---

While using this setup:

1. ScandiPWA theme is run by `wepack-dev-server`
2. All `/graphql` requests are sent to your remote server
3. There is an Nginx routing the requests

> **Note**: it is impossible to test the website in production mode (of the webpack build). This is the main downside of this approach.

> **Note**: the `https://scandipwa.local` wont be available. The PWA features will not function.

<hr>

In code examples, you might stumble across such declaration:

```bash
# to clone the fork
git clone git@github.com:<YOUR GITHUB USERNAME>/scandipwa-base.git
```

> **Note**: the `<YOUR GITHUB USERNAME>` is not a literal text to keep, but the "template" to replace with the real value.

## Before you start

1. If you plan to make changes to the theme make sure to [create GitHub account](https://github.com/join), or [sign in](https://github.com/login) into existing one.

    1. Make sure you have a SSH key assigned to your GitHub account, and you current machine has the same key. Read [how to setup SSH key on GitHub](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).

    2. Make sure to fork [`scandipwa-base` repository](https://github.com/scandipwa/base-theme). Read [how to fork repository on GitHub](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

2. Make sure your remote server has ScandiPWA installed on it

    The Magento theme could be different, but ScandiPWA modules should be installed and enabled. Read more how to install the ScandiPWA on existing Magento 2 server [here](./on-existing-m2.md).

    In case you do not have the ScandiPWA instance yet, try completing this setup using our instances: `demo.scandipwa.com` or `scandipwapmrev.indvp.com`. You can also request your own cloud instance by composing a mail to hello@scandipwa.com.

3. Make sure you have `node` available on you machine. To test this, run:

    ```bash
    node -v # should be 10^
    ```

    In case this command resulted in error, install node using the [official guide](https://nodejs.org/en/download/package-manager/). Prefer `nvm` installation to get NODE version 10 specifically.

## Time to decide - core or custom?

The theme can be developed in two modes - as contribution into core theme, or as custom theme development on top of core theme. Let's review each one:

### For ScandiPWA core contribution

1. Get the copy of `base-theme` - clone your fork, or clone the original repository.

    ```bash
    # to clone the fork
    git clone git@github.com:<YOUR GITHUB USERNAME>/base-theme.git

    # to clone the original repository
    git clone git@github.com:scandipwa/base-theme.git

    # to clone via HTTPS (not recommended)
    git clone https://github.com/scandipwa/base-theme.git
    ```

    > **Note**: sometimes, after the repository is cloned, the git chooses the `master` branch as default. This is the legacy (incorrect) default branch in case of `base-theme`. Please make sure you are using `2.x-stable`. You can do it using following command:

    ```bash
    git status # expected output `On branch 2.x-stable`
    ```

    If any other output has been returned, execute the following command to checkout the correct branch:

    ```bash
    git checkout 2.x-stable
    ```

    Later, for development purposes any new branch created from `2.x-stable` can be used.

2. Add following key to `package.json`:

    ```bash
    {
        // ...
        "proxy": "https://demo.scandipwa.com"
    }
    ```

3. From the cloned theme folder, execute following:

    ```bash
    npm ci # install dependencies
    npm run watch-core
    ```

### For custom theme development

> **Note**: initial setup must happen on real instance. After the bootstrapped theme is committed to the repository, you can proceed with this installation.

1. Inside, clone your already bootstrapped `scandipwa-base` package with theme already bootstrapped. The theme file should be present in `<REPO SOURCE>/src/app/design/frontend/<VENDOR>/<THEME>/`.

    ```bash
    git clone <CUSTOM THEME REPOSITORY GIT REMOTE>
    ```

2. Then, get matching `scandipwa/source` package version from [GitHub](https://github.com/scandipwa/base-theme) (lookup the required version in `src/composer.lock`, lookup `scandipwa/source` package) and clone it to vendor folder. Make sure the folder is present.

    ```bash
    mkdir -p src/vendor/scandipwa/source
    git clone git@github.com:scandipwa/base-theme.git src/vendor/scandipwa/source
    ```

3. Add following key to `package.json`, located in your theme's folder (`<REPO SOURCE>/src/app/design/frontend/<VENDOR>/<THEME>/package.json`):

    ```bash
    {
        // ...
        "proxy": "https://demo.scandipwa.com"
    }
    ```

4. From the custom theme theme folder, execute following:

    ```bash
    npm ci # install dependencies
    npm run watch
    ```

## Time to open the site

1. Open your favorite browser, i.e. Google Chrome

2. Open un-secure [localhost:3003](localhost:3003l) domain

> **Note**: in case you are getting CORS issues printed out in console, make sure to run chrome with disabled web-security flag set.

## Something does not work?

Follow this simple algorithm:

1. Refer to the [FAQ page](/docs/faq). It most probably already has the solution to your problem.

    > **Note**: the Docker setup related issues are also mentioned in this document.

2. If the issue still persists, [join our community slack](https://join.slack.com/t/scandipwa/shared_invite/enQtNzE2Mjg1Nzg3MTg5LTQwM2E2NmQ0NmQ2MzliMjVjYjQ1MTFiYWU5ODAyYTYyMGQzNWM3MDhkYzkyZGMxYTJlZWI1N2ExY2Q1MDMwMTk), and feel free to ask questions in `#pwa_tech` public channel.

3. Alternatively [create an issue on GitHub](https://github.com/scandipwa/scandipwa-base/issues/new/choose) - however, the response time there will be a little-bit longer than in community Slack.

