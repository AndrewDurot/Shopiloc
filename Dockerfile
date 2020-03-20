FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN yarn install
RUN yarn run compile

EXPOSE 3000

CMD [ "yarn", "start" ]
