FROM node:12-alpine

RUN apk add --no-cache tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata

ARG env
ENV NODE_ENV=${env} \ 
  HOME=/usr/local/webserver/movies

# Create app directory
WORKDIR /usr/local/webserver/movies

## node 镜像已经安装 yarn, 无需重复安装
RUN npm i -g pm2 

COPY ./server/server_koa2/package.json ./server/server_koa2/yarn.lock ./server/

RUN cd ./server \
  && yarn install --production --registry=https://registry.npm.taobao.org/

COPY ./client ./client
COPY ./server/server_koa2 ./server/

RUN cd ./client \
  && npm i --production --registry=https://registry.npm.taobao.org/ \ 
  && npm run build \
  && cd .. \
  && rm -rf ./client

EXPOSE 80

CMD [ "yarn", "run", ${NODE_ENV} ]