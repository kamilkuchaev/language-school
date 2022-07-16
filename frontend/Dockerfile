# base image
FROM node:16.13.2-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g @vue/cli@5.0.6

COPY . .

#EXPOSE 8080

CMD ["npm", "run", "serve"]
