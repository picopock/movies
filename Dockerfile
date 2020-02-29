FROM node:12-alpine

RUN apk add --no-cache tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ENV HOME=/usr/local/webserver/movies

# Create app directory
WORKDIR /usr/local/webserver/movies

RUN npm i -g yarn cgr pm2 \
  && cgr use taobao

COPY ./server/server_koa2/package.json,./server/server_koa2/yarn.lock ${HOME}/server/

RUN cd ${HOME}/server/ && yarn install --${NODE_ENV}

COPY ./client ${HOME}/client
COPY ./server/server_koa2 ${HOME}/server

RUN cd ${HOME}/client \
  && npm i --${NODE_ENV} \
  && npm run build \
  && cd .. \
  && rm -rf ./client \
  && cd ../server \
  && yarn install --production

EXPOSE 80

CMD [ "yarn", "run", ${NODE_ENV} ]