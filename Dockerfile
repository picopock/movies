FROM node:12-alpine

RUN apk add --no-cache tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && apk del tzdata

ENV NODE_ENV=production \ 
  HOME=/usr/local/webserver/movies \
  REGISTRY=https://registry.npm.taobao.org/

# Create app directory
WORKDIR ${HOME}

## node 镜像已经安装 yarn, 无需重复安装
RUN npm i -g pm2 --registry=${REGISTRY}

COPY ./server/server_koa2/package.json ./server/server_koa2/yarn.lock ./server/

RUN cd ./server \
  && yarn install --${NODE_ENV} --registry=${REGISTRY}

COPY ./client ./client
COPY ./server/server_koa2 ./server/

RUN cd ./client \
  && npm i --${NODE_ENV} --registry=${REGISTRY} \ 
  && npm run build \
  && cd .. \
  && rm -rf ./client

EXPOSE 80

CMD [ "pm2-runtime", "./server/pm2.config.yml", "--only", "movie-server", "--env", "production"]