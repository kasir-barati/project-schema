FROM node:14.15.0

WORKDIR /usr/src/app

EXPOSE ${APP_PORT}

ENTRYPOINT [ "npm", "run" ]

CMD [ "start:dev" ]
