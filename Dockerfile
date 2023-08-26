# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

#  Set environment variables
ENV NODE_ENV production
ENV DOKKU_PROXY_PORT_MAP http:80:3000
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install nest
RUN npm install -g @nestjs/cli prisma

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Gen
RUN npm run gen

# Copy prisma schema
RUN prisma generate

RUN prisma db push

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
