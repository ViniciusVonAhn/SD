FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "./bin/server.js" ]
