FROM node:22
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]