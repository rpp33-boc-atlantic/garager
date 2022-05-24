FROM node:18.2.0

WORKDIR /code

ENV PORT 3000

COPY package.json /code/package.json

RUN npm install
RUN npm run build-docker

COPY . /code

CMD ["node", "server/app.js"]
