FROM node:20.17.0-alpine

WORKDIR /home/app

COPY package*.json .

RUN npm install --timeout=300000

COPY . .

RUN npx prisma generate

CMD ["npm","run","start"]

