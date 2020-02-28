FROM node:12.16.0
WORKDIR /code
COPY package.json .

RUN yarn install

EXPOSE 9000

CMD [ "yarn", "start" ]

COPY src/ .
