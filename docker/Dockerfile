# transpile the code
FROM node:iron-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN yarn --production
RUN cp -R node_modules prod_node_modules

RUN yarn --frozen-lockfile && yarn build

# Production stage gets the compiled code and install production dependencies only
FROM node:iron-alpine as production

ARG APP_PORT=4600

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json yarn.lock *.env ./
COPY --from=builder /usr/src/app/dist ./src
COPY --from=builder /usr/src/app/prod_node_modules ./node_modules

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]
