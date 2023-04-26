FROM node:lts-alpine
EXPOSE 8000
ENV PORT=8000
WORKDIR /usr/app
COPY package*.json ./
COPY ./build .
RUN npm install
CMD node server.js
# CMD npm start