# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory for the app
WORKDIR /cms

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install -g @angular/cli
# Install the dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]
