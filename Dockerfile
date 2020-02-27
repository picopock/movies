FROM node:12

# Create app directory
WORKDIR /usr/local/webserver/movies

COPY . .

ENV NODE_ENV=production

RUN npm i -g yarn cgr pm2 \
  && cgr use taobao \
  && cd ./client \
  && npm i --production \
  && npm run build \
  && rm -rf node_modules \
  && cd ../server/server_koa2 \
  && yarn install --production

EXPOSE 80

CMD [ "pm2 start", "./bin/www" ]