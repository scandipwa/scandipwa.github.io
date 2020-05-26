# ScandiPWA docs

This repository contains docs of ScandiPWA. These are now docs, old can be found here: https://github.com/scandipwa/docs

## Before you start

1. Make sure the `gem` command is available:

    ```bash
    gem -v # should output 3^
    ```

    If the command is not found, install ruby. The gem executable will come packed in.

2. Install jekyll and bundler gem:

    ```bash
    gem install bundler jekyll
    ```

## Time to start

1. Install the the project dependencies, using `bundle`:

    ```bash
    bundle install
    ```

2. Start the server:

    ```bash
    bundle exec jekyll serve
    ```

## Update search indexes


    ```bash
    ALGOLIA_API_KEY='<ADMIN_API_KEY>' bundle exec jekyll algolia
    ```
