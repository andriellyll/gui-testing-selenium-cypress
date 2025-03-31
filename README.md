# GUI Testing - Cypress and Selenium
A starter kit for GUI testing the Sylius showcase with Cypress and Selenium.

You can install the sylius showcase with one docker container with this repository: [sylius-showcase-docker](https://github.com/andriellyll/sylius-showcase-docker).

Recomended capture-replay extension for Cypress.
[Cypress Scenario Recorder](https://chrome.google.com/webstore/detail/cypress-scenario-recorder/fmpgoobcionmfneadjapdabmjfkmfekb?hl=pt)


Recomended capture-replay extension for Selenium.
[Selenium IDE](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd)

It's neccessary to have browser firefox installed for execute the selenium scripts.
```
sudo apt install firefox
```

**It's neccessary to have Nodejs and Yarn installed.**

## Execute

First install the dependencies:

```
yarn install
```

**For execute the cypress scripts** you can use the cypress interface with:

```
yarn cypress
```

You can also run an unique test file in terminal:

```
yarn cypress:test-file cypress/e2e/products.cy.js
```

And finally you can execute the suite cypress with:

```
yarn cypress:test-suite
```

For execute selenium scripts you use this following commands:

```
yarn selenium:test-file selenium/e2e/payments.js
```

And for execute all suite:

```
yarn selenium:test-suite
```


# Sylius Showcase Docker
This Docker image is a showcase of the [Sylius](https://sylius.com/) e-commerce platform. It comes with development dependencies but the Symfony Web Profiler's debug toolbar is disabled by default.

This uses Ubuntu 20.04 as the base image and installs the latest version of Sylius on it.

It uses supervisord to run the following services all in one Docker container:
- PHP-FPM
- Nginx
- MariaDB

## Setup
First build the docker image:
```sh
docker build --platform linux/amd64 -t sylius-showcase .
```

And then run a docker container with the image:
```sh
docker run -v $(pwd)/media:/app/public/media -d --restart=always -p 8080:80 --name 'sylius' sylius-showcase
```
>The **./media** volume is exposed for the container. We will give write permission for this folder.
>The **restart** flag is actived. The container will start again if the host machine power off.
>The container is named as **'sylius'**.


### Add example data
```sh
docker exec -it sylius bin/console sylius:fixtures:load -n && sudo chown -R 33:33 media
```
>This chown permit the container to write in the media folder.
>The example data will be loaded.

## View the web shop
Visit http://localhost:8080/ to view the shop's frontend.
Visit http://localhost:8080/admin to view the admin-view.

### Login
_Default credentials:_  
Username: `sylius`  
Password: `sylius`  