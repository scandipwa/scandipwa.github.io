---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Service overview
description: How to operate the stack, see logs, enter the container & more!

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    next:
        content: Useful CLI commands
        url: '/docs/docker/cli/'

---

## Watch video

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/-RWQB4US4tg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## List of available services:

### `app` container

Application running and maintaining (php, composer, nodejs, gulp, ruby, python). Latest versions available from: <https://hub.docker.com/scandipwa/scandipwa-base>

### `varnish` container

Backend request cache of the application. Is a requirement of `scandipwa/persisted-query` module. For version list please refer to: <https://hub.docker.com/scandipwa/varnish>

### `nginx` container

Container running nginx, based on official images. Is a heart of the application routing all the requests. For version list and details please refer to: <https://hub.docker.com/_/nginx/>

### `mysql` container

Container is running mysql server and has **mysql-cli client installed inside**. For version list and details please refer to: <https://hub.docker.com/_/mysql/>

### `redis` container

Container is running redis and has **redis-cli client installed inside**. Is a requirement of `scandipwa/persisted-query` module. For version list and details please refer to: <https://hub.docker.com/_/redis/>

### `maildev` container

Container is running maildev service inside (replaces mailcatcher with a few more great features). WebUI is available on _your_host:1080_. Internaly ssmtp is used to forward e-mails to maildev from php mail() function.

### `rendertron` container

Container, that provides Server Rendering of the page, uses Renderton / Pupeteer as it's base. Is required for better SEO.

### `frontend` container

Plug-able container for client-side app development for **develpoment envrionment only**. Frontend service provides a convenient way of customizing and working on ScandiPWA theme. Service itself is running a Webpack dev-server with autocompile and auto-reload. This service is declared in `docker-compose.frontend.yml`.

### `ssl-term` container

Plug-able container, that provides SSL termination. Service workers can be run only on `localhost` or hosts running underHTTPS protocol with a valid SSL certificate. To make it easier for developers to get up and running with it - `ssl-term` can be plugged independently to any set of containers, using `docker-compose.ssl.yml`.

### `elasticsearch` container

Container running elasticsearch. For version list and details please refer to: <https://www.docker.elastic.co>
