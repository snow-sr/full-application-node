# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

#  Set environment variables
ENV NODE_ENV production

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy prisma schema
RUN npx prisma generate

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]