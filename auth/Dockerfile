# Use the official Node.js image from the Docker Hub as the base image
FROM node:22-alpine3.19 AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# --- Development Stage ---
FROM base AS dev
EXPOSE 4002
CMD npm run dev

# --- Production Build Stage ---
FROM base AS build
RUN npm run build

# --- Production Build Stage ---
FROM node:22-alpine3.19 AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env .env
EXPOSE 4002
CMD ["node", "dist/index.js"]