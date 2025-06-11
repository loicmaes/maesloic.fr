FROM node:22-alpine

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./
COPY tsconfig.json ./
RUN yarn install --production --frozen-lockfile

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

ENV NODE_ENV=production
RUN yarn build

CMD npx prisma migrate deploy && node .output/server/index.mjs
