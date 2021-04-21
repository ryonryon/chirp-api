FROM node:15.12.0

WORKDIR /app

EXPOSE 4000

COPY ["package*.json", "tsconfig.json", "./"]

RUN npm install

COPY . .

CMD [ "npx", "ts-node-dev", "main.ts" ]