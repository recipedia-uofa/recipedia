FROM node:12.16.0
WORKDIR /code
COPY package.json .

RUN npm install

EXPOSE 9000

CMD [ "npm", "start" ]

COPY src/ .
