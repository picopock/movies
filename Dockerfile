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

RUN npm i -g cgr pm2 \
  && cgr use taobao

COPY ./server/server_koa2/package.json ${HOME}/server/

RUN cd ${HOME}/server/ && npm install --${NODE_ENV}

COPY ./client ${HOME}/client
COPY ./server/server_koa2 ${HOME}/server

RUN cd ${HOME}/client \
  && npm i --${NODE_ENV} \
  && npm run build \
  && cd .. \
  && rm -rf ./client \
  && cd ./server

EXPOSE 80

CMD [ "npm", "run", ${NODE_ENV} ]