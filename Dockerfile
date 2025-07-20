FROM node:alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY index.js /app/

ENTRYPOINT ["node", "index.js"]