FROM node:14.21.3-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]