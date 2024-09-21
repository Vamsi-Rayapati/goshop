# Use the official Node.js image from the Docker Hub as the base image
FROM node:22-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4002

# Define the command to run the app
CMD npm run dev
