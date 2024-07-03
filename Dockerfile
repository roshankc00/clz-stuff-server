FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm

RUN apk add --no-cache build-base cmake git linux-headers

RUN pnpm install opencv4nodejs@5.6.0 

RUN pnpm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000 

CMD ["node", "dist/main.js"]