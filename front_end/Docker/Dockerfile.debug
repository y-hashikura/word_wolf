FROM node:20-bullseye as BUILD_IMAGE

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .. .

EXPOSE 5173 9229

CMD ["npm", "run", "debug"] 