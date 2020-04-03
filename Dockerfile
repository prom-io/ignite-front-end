FROM node:12

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE ${REACT_APP_PRODUCTION_PORT}

CMD ["yarn", "run", "production"]
