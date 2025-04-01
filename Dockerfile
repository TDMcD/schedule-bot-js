# Using a lightweight Node image (ARM-compatible)
FROM node:20-alpine

# Install dependencies needed to compile native modules
RUN apk add --no-cache python3 make g++ sqlite

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# Install fresh modules for the target architecture
RUN npm install --omit=dev

# Bundle app source
COPY . .

ENV NODE_ENV=production

# Clean out the node_modules
# RUN rm -rf node_modules

CMD [ "node", "src/index.js" ]