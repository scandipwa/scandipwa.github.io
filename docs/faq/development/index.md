---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: FAQ about development

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/faq'
  title: FAQ

---

**If you have not found an answer to your issue** here, but happened to resolve it on your own / with help of community - please open a pull-request, or an issue with solution details.

Alternatively, write us in [Slack](https://join.slack.com/t/scandipwa/shared_invite/enQtNzE2Mjg1Nzg3MTg5LTQwM2E2NmQ0NmQ2MzliMjVjYjQ1MTFiYWU5ODAyYTYyMGQzNWM3MDhkYzkyZGMxYTJlZWI1N2ExY2Q1MDMwMTk).

## Refetch component data when navigating back

Use “withRouter” to check for the URL and check if the new URL is different from the previous one.

## Understand important changes when upgrading ScandiPWA versions

All the important changes with each release are listed in GitHub under the [GitHub Release important notes section](https://github.com/scandipwa/base-theme/releases).

You can also compare two tags using [GitHub compare functionality](https://docs.github.com/en/github/committing-changes-to-your-project/comparing-commits).

General advice for easier upgrade process is to extend the code and keep the pure override count low. Extend original classes in overrides, do not copy them.

## Theme doesn't work if the index.php configured is not in the pub folder resulting in 404 error when requesting resources

ScandiPWA does not support installation in non /pub folder. Magento 2 also recommends installing it under /pub folder.

## Can't access Docker MySQL on my local setup

You can access Docker MySQL on your local setup with credentials from .application file and using 3307 port.

## ERROR: Connection to Redis redis:6379 failed after 2 failures.Last Error: (0) php_network_getaddresses: getaddrinfo failed: Name or service not known

This can happen after running the following command:

```bash
magento scandipwa:theme:bootstrap Scandiweb/pwa
```

To solve it you have to restart the app container. If this doesn't help run the following command:

```bash
docker run -it -e COMPOSER_AUTH --entrypoint /bin/bash APP_CONTAINER_NAME
```

After rerun the command:

```bash
magento scandipwa:theme:bootstrap Scandiweb/pwa"
```

## Where is the correct place to install a new font for the base theme?

Fonts should be installed in the theme public folder and in index.development.html

Before that you must create a file with a different name as it is always taken from vendor:
1. Rename the index file
2. Change webpack import for it
3. Add your new fonts there

## ERROR: main.CRITICAL: Class ...\App\Config\Initial\Reader\Proxy does not exist

Run the following command from Magento 2 root to resolve the issue:

```bash
rm -rf generated && magento c:f && chmod -R 777
```

## How to bypass HTTPs on local?

Site can be opened with HTTP and HTTPs by default on local.

## Newly added store is not working altough is shows up in the store switcher

Ensure that newly created stores are added to your Nginx configuration.

## Does ScandiPWA plan to implement TypeScript?

The core will not migrate to TypeScript in a relatively long term. The extensions however - might be done in any language. This is because of the learning curve needed for TypeScript. We prefer simplier technology - most M2 developer are relatively unexperienced with JavaScript. The interfaces and some TypeScript based components might come with UI library in the future. It is important step for extensions, as there is a need to depend on some abstraction when writing an extension.

## ERROR: no such file or directory, open '.../Scandiweb/pwa/package.json'

Run the following Magento command from the container:

```bash
scandipwa:theme:bootstrap Scandiweb/pwa
```

If it fails please remove the folder app/design/frontend/Scandiweb/pwa

## How to view real time code changes to the Theme?

Create a file with the same name in app/design and watch the following [tutorial video](https://www.youtube.com/watch?v=LcM3DlQ8TbU) to learn how to customize it.

## How to modify the root.phtlm on my custom theme?

Change the file name of your index.production.phtml and change the path to it in webpack.

## Can I extend constructors?

Changes in constructor at this momemnt irrevertable. While we are working on making them extendable please override them completly.

## Chrome extensions don't work.

You can run chrome with WEB security disabled.

## dcf up -d --remove-orphans can't bring frontend container up

Running the following command solves it:

```bash
dcf build
```

After build just rerun the following command:

```bash
dcf up -d --remove-orphans
```

## What is the best practice to implement a new module between Magento and ScandiPWA?

You should develop using ScandiPWA plugin mechanism - http://docs.scandipwa.com/docs/development/plugin-mechanism/

## How ScandiPWA manages cache?

1. Utilizes default Magento 2 cache control mechanism over X-Magento-Tags-Pattern header.
2. Provides AddTagsToResponsePlugin to add entity headers to each GraphQl cacheable response.
3. Utilizes custom Cache entity (singleton), to gather all entities, that were loaded during current request.
4. Flush happens based on default cache_flush events for most entities.
5. CMS pages has own event observers to track response/flush.