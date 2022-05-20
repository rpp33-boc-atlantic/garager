FROM node:18.2.0

WORKDIR /code

#ENV PORT 3000

COPY package.json /code/package.json

#RUN npm install

COPY . /code

#CMD ["node", "src/server.js"]