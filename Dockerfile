# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

#  Set environment variables
ENV NODE_ENV production
ENV DOKKU_PROXY_PORT_MAP http:80:3000
ENV DATABASE_URL postgres://postgres:db6e5cdb9857a3c9d737c0c4d1f05d44@dokku-postgres-dbnestjs01:5432/dbnestjs01
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

# Copy prisma schema
RUN prisma generate
RUN prisma db push

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
