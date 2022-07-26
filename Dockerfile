FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./

CMD [ "node", "./bin/www" ]
