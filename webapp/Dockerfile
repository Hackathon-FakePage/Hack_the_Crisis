FROM node:12-alpine

WORKDIR /code

COPY ./package.json /code
COPY ./yarn.lock /code
# COPY ./package-lock.json /code

RUN npm install

COPY . /code

RUN npm run start

