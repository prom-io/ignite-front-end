FROM node:12

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

EXPOSE ${REACT_APP_PRODUCTION_PORT}

CMD ["node", "server.js"]
