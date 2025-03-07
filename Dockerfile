FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./ ./

RUN npm install --omit dev

EXPOSE 3000

CMD ["npm", "start"]
