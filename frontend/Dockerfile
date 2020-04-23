FROM node:latest

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

COPY package.json /usr/src/frontend/

RUN npm install npm@latest -g
RUN npm install

CMD ["npm", "start"]