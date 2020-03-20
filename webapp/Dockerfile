# FROM node:12-alpine

# WORKDIR /code

# COPY ./package.json /code
# COPY ./package-lock.json /code

# RUN npm i

# ADD . /code

# # RUN npm run ng build -- --prod --output-path=dist
# # RUN npm run build


# EXPOSE 4200

# CMD ng serve --port 4200 --host 0.0.0.0 --poll 1


# The builder from node image
FROM node:12-alpine as builder

WORKDIR /code

COPY ./package.json /code
COPY ./package-lock.json /code

RUN npm install

COPY . /code

RUN npm run build


# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /code/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

