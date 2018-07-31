FROM node:8.11.1
EXPOSE 80

# Setup app dir
RUN mkdir -p /usr/local/share/app
WORKDIR /usr/local/share/app

COPY ./package.json /usr/local/share/app
RUN npm install --production
COPY dist /usr/local/share/app
COPY node-wrapper.sh /usr/local/share/app

CMD ["/usr/local/share/app/node-wrapper.sh", "app.js"]
