FROM node:18
WORKDIR /app
COPY Backend/package.json ./
RUN npm install
COPY backend/ .
EXPOSE 3000
CMD ["node", "app.js"]
