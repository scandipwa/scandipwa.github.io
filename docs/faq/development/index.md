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