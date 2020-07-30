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

