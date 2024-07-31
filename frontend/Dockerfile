# Stage 1: Build the React application
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Uses port which is used by the actual application
EXPOSE 5000

# Run application
CMD [ "npm", "start" ]
