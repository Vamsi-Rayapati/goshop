FROM nginx:stable-alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your static website files to the container
COPY html /usr/share/nginx/html