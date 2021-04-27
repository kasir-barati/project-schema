FROM node:14.15.0

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .
COPY ./.* .

EXPOSE ${APP_PORT}

CMD ["npm", "start"]