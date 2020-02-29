# Run all containers
`docker-compose up -d`

# Stop/Kill server
`docker-compose down`

# Ssh into one service with config
`docker-compose run <service> /bin/bash`

# Get running containers
`docker ps`

# Get available images
`docker images`

# Get logs for one service (and follow)
`docker-compose logs -f <service>`

# Run everything in docker except server
```
docker-compose up -d
docker-compose kill server
yarn start
```
