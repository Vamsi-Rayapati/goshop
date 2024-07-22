# Stage 1: Build the React application
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 5000

# Run application
CMD [ "npm", "start" ]
# CMD serve -p 5000 -s build
