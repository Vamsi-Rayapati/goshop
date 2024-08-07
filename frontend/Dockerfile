# Stage 1: Copy code and install dependencies
FROM node:22-alpine3.19 AS base
WORKDIR /app
COPY . .
RUN npm ci

# Stage 2 Build Phase
FROM base AS build
RUN npm run build


# Stage 3 Dev Phase
FROM base AS dev
EXPOSE 5000
CMD ["sh", "-c", "npm start"]

# Stage 4 Serve Phase
FROM node:22-alpine3.19 AS prod
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
EXPOSE 5000
CMD ["sh", "-c", "serve -p 5000 -s build"]
