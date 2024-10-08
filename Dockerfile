FROM node:22-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm","start"]