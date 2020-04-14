# build client assets
FROM node:12-alpine as assetsBuilder

ENV NODE_ENV=production \ 
  HOME=/usr/local/webserver/movies \
  REGISTRY=https://registry.npm.taobao.org/

WORKDIR ${HOME}

COPY ./client/package.json ./client/package-lock.json ./client/

RUN cd ./client \
  && npm ci --${NODE_ENV} --registry=${REGISTRY}

COPY ./client ./client

RUN cd ./client \
  && npm run build -- --prod \
  && mv ./src/favicon.ico ../dist/ \
  && mv ./src/assets/ ../dist/

# build server image
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

COPY ./server/server_koa2/package.json ./server/server_koa2/yarn.lock ./server/

# node 镜像已经安装 yarn, 无需重复安装
RUN yarn global add pm2 --registry=${REGISTRY} \
  && cd ./server \
  && yarn install --${NODE_ENV} --registry=${REGISTRY}

COPY ./server/server_koa2 ./server/

COPY --from=assetsBuilder ${HOME}/dist/index.html ./server/views/index.html
COPY --from=assetsBuilder ${HOME}/dist/ .

EXPOSE 80

CMD [ "pm2-runtime", "./server/pm2.config.yml", "--only", "movie-server", "--env", "production"]