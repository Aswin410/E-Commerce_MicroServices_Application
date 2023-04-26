FROM node:lts-buster-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8003
CMD [ "node", "index.js" ]