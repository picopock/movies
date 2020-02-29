FROM node:12-alpine

RUN apk add --no-cache tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata

ARG env
ENV NODE_ENV=${env}
ENV HOME=/usr/local/webserver/movies

# Create app directory
WORKDIR /usr/local/webserver/movies

RUN npm i -g cgr pm2 yarn \
  && cgr use taobao

COPY ./server/server_koa2/package.json,./server/server_koa2/yarn.lock ./server/

RUN cd ./server/ && yarn install --${NODE_ENV}

COPY ./client ./client
COPY ./server/server_koa2 ./server

RUN cd ./client \
  && npm i --${NODE_ENV} \
  && npm run build \
  && cd .. \
  && rm -rf ./client

EXPOSE 80

CMD [ "npm", "run", ${NODE_ENV} ]