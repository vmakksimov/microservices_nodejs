FROM node:alpine

WORKDIR /app
# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]