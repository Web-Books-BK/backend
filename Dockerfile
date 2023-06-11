FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "node", "--no-warnings", "build/app.js" ]
