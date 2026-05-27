FROM node:lts AS builder 

WORKDIR /app

RUN npm install

COPY . .
 
RUN npm run build

CMD [ "node", "dist/server.js" ]
