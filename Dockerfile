FROM node:10.6.0-alpine

WORKDIR /usr/src/app

COPY . .

CMD ["npm", "start"]
