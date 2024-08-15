FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

RUN yarn global add  pm2

RUN apk update

RUN apk add nano

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["pm2-runtime", "start", "app.json"]