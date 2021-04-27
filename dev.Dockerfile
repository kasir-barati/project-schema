FROM node:14.15.0

WORKDIR /usr/src/app

RUN npm i -g nodemon

ENTRYPOINT [ "npm", "run" ]

CMD [ "start:dev" ]