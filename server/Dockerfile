FROM node:14.21.3-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/prisma ./prisma/
COPY .env-docker ./
COPY tsconfig.json ./

COPY . .

RUN npm install --verbose
RUN npx prisma generate

EXPOSE 9000
CMD [ "npm", "run", "dev" ]