FROM node:latest

WORKDIR /usr/app

COPY package*.json .

RUN npm install --quiet

COPY ./ ./

RUN echo "running portfolio API"
CMD ["npm", "start"]
