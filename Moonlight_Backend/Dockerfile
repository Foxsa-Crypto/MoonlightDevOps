FROM node:lts AS builder 

WORKDIR /app

RUN npm install

COPY . .
 
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
