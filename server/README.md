## Setup Instructions

The server should work on all platforms, but has only been tested on Ubuntu 18.04 (recommended) and Windows 10.
If you plan to run the server (not just the tests), we strongly recommend ubuntu for the server because docker seems more stable in Ubuntu.

In this case, there are two different setups depending on if you just want to the run the program, just want to test the program, or both. If you only plan on testing the application, you will not need to install docker whereas if you only plan on running the server you do not need to install yarn. The instructions below assume you want to setup your system to both run the server, test the server and develop locally.

1. Install [node v12.16.0](https://nodejs.org/en/download/) and [yarn >1.21.1](https://classic.yarnpkg.com/en/docs/install/) on your system.
2. Install all package dependencies using yarn

```bash
cd ~/recipedia/client
yarn install
```
3. Install [Docker Engine](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install/) on your system.

## Running instructions
While in the server directory run the following commands

```
docker-compose build   # To build the server
docker-compose up -d   # To run the database and the server, then detach
```

## Testing instructions

While in the server directory run the following command
```
yarn test
```
