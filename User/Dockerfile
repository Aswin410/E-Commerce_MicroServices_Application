FROM node:lts-buster-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
COPY . .
EXPOSE 8001
CMD [ "node", "index.js" ]