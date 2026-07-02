# Multi-stage build for React Vite application (npm workspaces monorepo)
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies from the root workspace lockfile.
# npm ci needs every workspace's package.json present, even though
# this image only builds and ships the upskiller site.
COPY package.json package-lock.json ./
COPY upskiller/package.json ./upskiller/
COPY lux/package.json ./lux/
RUN npm ci

# Copy source code
COPY shared/ ./shared/
COPY upskiller/ ./upskiller/

# Build the main website
RUN npm run build -w upskiller

# Production stage with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/upskiller/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG PORT=8080
EXPOSE ${PORT}

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
