# Multi-stage build for React Vite application
FROM node:18-alpine AS builder

# Pick up patched Alpine packages (e.g. expat) not yet baked into the base image tag
RUN apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /

# Copy package files
COPY upskiller/package*.json ./upskiller/
COPY package*.json ./

# Install dependencies
WORKDIR /upskiller
RUN npm ci

# Copy source code
COPY upskiller/ ./upskiller/
COPY shared/ ./shared/
COPY upskiller/tsconfig.json ./upskiller/tsconfig.json
COPY upskiller/vite.config.ts ./upskiller/vite.config.ts

WORKDIR /upskiller/upskiller
RUN ls -l

# Asset base URL baked into the JS bundle at build time (Vite only exposes
# VITE_-prefixed vars). Real working default (not a secret, just a public bucket
# URL) so any plain `docker build .` still produces a working image; the GCP
# path overrides it explicitly via --build-arg (see cloudbuild.yaml / build.sh).
ARG VITE_ASSET_BASE_URL=https://upskiller-website.s3.fr-par.scw.cloud/upskiller
ENV VITE_ASSET_BASE_URL=${VITE_ASSET_BASE_URL}

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Pick up patched Alpine packages (e.g. expat) not yet baked into the base image tag
RUN apk update && apk upgrade --no-cache

# Copy built assets from builder stage
COPY --from=builder /upskiller/upskiller/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG PORT=8080
EXPOSE ${PORT}

# Start nginx
CMD ["nginx", "-g", "daemon off;"]