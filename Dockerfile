FROM node:14.15.0 AS builder
ENV NODE_ENV build
ENV APP_PORT=3000
WORKDIR /usr/src/app

# If you have troubles with node-gyp use should install these dependencies 
# ref: https://gist.github.com/nzvtrk/cba2970b1df9091b520811e521d9bd44
# RUN apk add g++ make python

COPY package*.json ./
RUN npm ci
COPY . ./
COPY .* ./
RUN npm run build && npm prune --production

FROM node:14.15.0
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist/ ./

ENTRYPOINT [ "npm", "run" ]

EXPOSE ${APP_PORT}

CMD [ "start:prod" ]
