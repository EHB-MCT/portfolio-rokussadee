ARG name=portfolio

FROM node:latest

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY ./ ./

RUN echo "running ${name}"
CMD ["npm", "start"]