---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Mac Docker setup
description: This guide is for setting up on Mac machines. This guide is meant for <b>local installation only</b>.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/installation/docker'
  title: Docker

---

## Before you start

1. If you plan to make changes to the theme make sure to [create GitHub account](https://github.com/join), or [sign in](https://github.com/login) into existing one.

    1. Make sure you have a SSH key assigned to your GitHub account, and you current machine has the same key. Read [how to setup SSH key on GitHub](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).

    2. Make sure to fork [`scandipwa-base` repository](https://github.com/scandipwa/scandipwa-base). Read [how to fork repository on GitHub](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

2. Make sure you have `git`, `docker-compose` and `mutagen` binaries installed. To test, execute following command in the bash terminal:

    ```bash
    git --version # it should be ^2
    docker-compose -v # it should be ^1.24
    mutagen version # it should be ^0.11.2
    ```

    - If `git` was not found, please follow [this installation instruction](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

    - If `docker-compose` was not found, please follow [this installation instruction](https://docs.docker.com/compose/install/).

    - If `mutagen` was not found, please follow [this installation instruction](https://mutagen.io/documentation/introduction/installation).

3. Choose an installation directory. It can be anywhere on your computer. Folder `/var/www/public` is not necessary, prefer `~/Projects/` for ease of use.

4. To make your life easier, make sure to create an aliases for docker-compose and mutagen commands. Follow [the guide](https://www.tecmint.com/create-alias-in-linux/) to create **permanent** aliases. We recommend defining following:

    ```bash
    # use `localtheme` to start without `frontend` container
    alias localtheme="mutagen project -f mutagen.local.yml"

    # use `front` to start with `frontend` container
    alias front="mutagen project -f mutagen.frontend.yml"

    # use `dc` when you need to interact with up and running docker containers (without frontend container)
    alias dc="docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml"

    # use `dcf` when you need to interact with up and running docker containers (with frontend container)
    alias dcf="docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml -f docker-compose.frontend.yml"

    # use `inapp` to quickly get inside of the app container
    alias inapp="docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml -f docker-compose.frontend.yml exec -u user app"

    # use `infront` to quickly get inside of the frontend container
    alias infront="docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml -f docker-compose.frontend.yml exec -w /var/www/public/app/design/frontend/Scandiweb/pwa/ frontend"

    # use `applogs` to quickly see the last 100 lines of app container logs
    alias applogs="docker-compose logs -f --tail=100 app"

    # use `frontlogs` to quickly see the last 100 lines of frontend container logs
    alias frontlogs="docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml -f docker-compose.frontend.yml logs -f --tail=100 frontend"
    ```

    Those aliases are required to have all services available at all times. Otherwise, if just using `docker-compose` only services defined in `docker-composer.yml` will be available. Understand what services are available at all by reading [this part of our documentation](https://docs.scandipwa.com/#/docker/03-services?id=list-of-available-services).

    > **Note**: Mutagen is necessary for Mac platform to improve performance. It is used to sync files between the host and docker container. There are some points you need to bear in mind while working with mutagen coming soon!

5. Make sure you have a valid Magento 2 `COMPOSER_AUTH` set. This is an environment variable set on your host machine. To test if it is set, use:

    ```bash
    env | grep COMPOSER_AUTH
    ```

    If the output of this command is empty, or, if the output (JSON object) does not contain `"repo.magento.com"` key, you need to set / update the environment variable.

    1. Make sure you have a valid Magento account. You can [create](https://account.magento.com/applications/customer/create/) or [login to existing one](https://account.magento.com/applications/customer/login/) on Magento Marketplace site.

    2. Upon logging to your Magento Marketplace account follow the [official guide](https://devdocs.magento.com/guides/v2.3/install-gde/prereq/connect-auth.html) to locate and generate credentials.

    3. Now, using the following template, set the environment variable:

        ```bash
        export COMPOSER_AUTH='{"http-basic":{"repo.magento.com": {"username": "<PUBLIC KEY FROM MAGENTO MARKETPLACE>", "password": "<PRIVATE KEY FROM MAGENTO MARKETPLACE>"}}}'
        ```

        To set the environment variables follow [this guide](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-environment-variables-in-linux/). Make sure to make them persist (stay between reloads).


6. Execute following command to add `scandipwa.local` to your `/etc/hosts` file and map it to the `127.0.0.1`:

    ```bash
    echo '127.0.0.1 scandipwa.local' | sudo tee -a /etc/hosts
    ```

## When you are ready

1. Get the copy of `scandipwa-base` - clone your fork, or clone the original repository. **Do not try to download the release ZIP - it will contain outdated code**.

    ```bash
    # to clone the fork
    git clone git@github.com:<YOUR GITHUB USERNAME>/scandipwa-base.git

    # to clone the original repository
    git clone git@github.com:scandipwa/scandipwa-base.git

    # to clone via HTTPS (not recommended)
    git clone https://github.com/scandipwa/scandipwa-base.git
    ```

    > **Note**: sometimes, after the repository is cloned, the git chooses the `master` branch as default. This is the legacy (incorrect) default branch in case of `scandipwa-base`. Please make sure you are using `2.x-stable`. You can do it using following command:

    ```bash
    git status # expected output `On branch 2.x-stable`
    ```

    If any other output has been returned, execute the following command to checkout the correct branch:

    ```bash
    git checkout 2.x-stable
    ```

2. Generate and trust a self-signed SSL certificate.

    1. Begin with generating a certificate. Use the following command for that:

        ```bash
        make cert
        ```

    2. Add certificate to the list of trusted ones. Add this certificate `<PATH TO PROJECT ROOT>/opt/cert/scandipwa-ca.pem` to Key Chain. See [this instruction](https://tosbourn.com/getting-os-x-to-trust-self-signed-ssl-certificates/) for more details.

    3. Reload the Google Chrome. Sometimes, the Google Chrome caches the old-certificates. Make to completely exit chrome, before opening it back. Sometimes, the "invalid certificate" issues only disappears after the full host machine reload.

3. Pull all necessary container images

    > **Note**: `container image` != `media image`. Read more about [container images here](https://docs.docker.com/v17.09/engine/userguide/storagedriver/imagesandcontainers/).

    ```bash
    # if you have the alias set up
    dcf pull

    # without aliases (not recommended)
    docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml pull
    ```

***

There are two ways to use the setup: with `frontend` container and without it. The setup with `frontend` container is called **development**. The alias running it is `front`. The alias for **production**-like run is `localtheme`.

> **Note**: If you have already ran ScandiPWA in any mode once, you can safely skip to step 3. In case, of course, you plan on development.

***

4. Start the infrastructure in **production-like** mode

    ```bash
    # if you have the alias set up
    localtheme start

    # without aliases (not recommended)
    mutagen project -f mutagen.local.yml start
    ```

5. Wait until the infrastructure starts

    After the previous command is executed, the site won't be available quickly, it takes 80-250s to start, you can see when the application is ready to receive the requests by watching `app` logs, using this command:

    ```bash
    # if you have the alias set up
    applogs

    # without aliases (not recommended)
    docker-compose logs -f --tail=100 app
    ```

    If you can see following output, the application is ready!

    ```bash
    NOTICE: ready to handle connections
    ```

    > **Note**: if you are starting the project with the frontend container, the ability of application to receive the requests does not mark that it is ready to be used. Frontend container compiles the theme asynchronously, so you need to read logs of the frontend container to understand when this process finishes. Instructions to that are described above.

6. Start the development-setup (optional)

    ```bash
    # if you have the alias set up
    front start

    # without aliases (not recommended)
    mutagen project -f mutagen.frontend.yml start
    ```

7. Wait until the development infrastructure starts

    In **development** setup - the page will be available much faster rather than in **production**-like setup - right after the theme compilation in `frontend` container. You can track the progress using following command:

    ```bash
    # if you have the alias set up
    frontlogs

    # without aliases (not recommended)
    docker-compose -f docker-compose.yml -f docker-compose.local.yml -f docker-compose.ssl.yml -f docker-compose.frontend.yml logs -f --tail=100 frontend
    ```

    If you can see following output, the frontend is ready!

    ```bash
    ℹ ｢wdm｣: Compiled successfully
    ```

    > **Note**: the requests to `/graphql` will still fail, you need to wait until the `app` container starts. See instruction in step 2 to see how.

## How to access the site?

> **Note**: all application configurations, i.e. admin password, admin username, admin URL, application mode and more is located in `.application` file.

1. To run any Magento-related command (`composer`, `bin/magento`) use `inapp bash` command on your host machine. Do not attempt to run them on your host machine.

2. Open your favorite browser, i.e. Google Chrome

3. Regardless of **production** or **development** setup go to [https://scandipwa.local](https://scandipwa.local)

    1. In **production** the Magento (`app` container) is fully responsible for what you see in browser

    2. In **development** the webpack-dev-server (`frontend` container) is responsible for frontend, while `/media`, `/graphql`, `/admin` URLs are still coming from Magento.

4. To access the Maildev, go to [http://scandipwa.local:1080/maildev](http://scandipwa.local:1080/maildev)

5. To access the Kibana, go to [http://scandipwa.local:5601](http://scandipwa.local:5601)

## Want to get the demo content?

To get the [demo.scandipwa.com](https://demo.scandipwa.com/) content (but without multi-store and languages) follow this step-by-step guide:

1. Stop the `app` container, using following command:

    ```bash
    # if you have the alias set up
    dc stop app

    # without aliases (not recommended)
    docker-compose stop app
    ```

2. Drop the existing database

    ```bash
    docker-compose exec mysql mysql -u root -pscandipwa -e "DROP DATABASE magento; CREATE DATABASE magento;"
    ```

3. Import the demo site database dump

    ```bash
    docker-compose exec -T mysql mysql -u root -pscandipwa magento < deploy/latest.sql
    ```

4. Recreate the infrastructure

    ```bash
    # With frontend container
    front terminate && front start

    # Without frontend container
    localtheme terminate && localtheme start
    ```

5. Get the media files

    There are two options to get the media files - automatic (using wget), and manual.

    - Get media files automatically

        > **Note**: the following command requires you to have the `wget` binary available. To check if it is available, use following command:

        ```bash
        wget --version # should output version ^1
        ```

        If the `wget` command is not found, follow [this guide](https://www.tecmint.com/install-wget-in-linux/) to get it. Else, or after installation, execute following command to download & extract media:

        <!-- TODO: TEST FOLLOWING COMMAND -->

        ```bash
        wget -c https://scandipwa-public-assets.s3-eu-west-1.amazonaws.com/2.2.x-media.tar.gz -O - | sudo tar -xz -C <PATH TO PROJECT ROOT>src/pub/media
        ```

    - Get media files manually

        1. Download media files from [S3 bucket](https://scandipwa-public-assets.s3-eu-west-1.amazonaws.com/2.2.x-media.tar.gz)

        2. Move archive into the `<PATH TO PROJECT ROOT>src/pub/media` folder

        3. Extract the archive using following command:

            ```bash
            tar -zxvf scandipwa_media.tgz
            ```

## Want some development guidance?

Stuck? Don't know where to start? Checkout our development guide! It will guide you through the best-practices working with ScandiPWA! How to debug, configure the code-editor, code-style checker and create your first base-template! This, and much-much more in:

[Our awesome development guide](/docs/development/)

## Something does not work?

Follow this simple algorithm:

1. Refer to the [FAQ page](/docs/installation/faq). It most probably already has the solution to your problem.

2. If the issue still persists, [join our community slack](https://join.slack.com/t/scandipwa/shared_invite/enQtNzE2Mjg1Nzg3MTg5LTQwM2E2NmQ0NmQ2MzliMjVjYjQ1MTFiYWU5ODAyYTYyMGQzNWM3MDhkYzkyZGMxYTJlZWI1N2ExY2Q1MDMwMTk), and feel free to ask questions in `#pwa_tech` public channel.

3. Alternatively [create an issue on GitHub](https://github.com/scandipwa/scandipwa-base/issues/new/choose) - however, the response time there will be a little-bit longer than in community Slack.

