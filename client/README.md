## Setup Instructions

The client should work on all platforms, but has only been tested on Ubuntu 18.04 (recommended) and Windows 10.

1. Install [node v12.16.0](https://nodejs.org/en/download/) and [yarn >1.21.1](https://classic.yarnpkg.com/en/docs/install/) on your system.
2. Install all package dependencies using yarn

```bash
cd ~/recipedia/client
yarn install
```

## Running instructions

Simply run the following command while in the client directory

```
yarn start
```

## Testing instructions

Simply run the following command while in the client directory

```
yarn test
```

## Deployment instructions

Once logged into the Cybera instance:
```bash
cd ~/recipedia/client
docker-compose -f docker-compose.prod.yml up
```
