# Multi-stage build for React Vite application (npm workspaces monorepo)
FROM node:18-alpine AS builder

# Pick up patched Alpine packages (e.g. expat) not yet baked into the base image tag
RUN apk update && apk upgrade --no-cache

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

# Asset base URL baked into the JS bundle at build time (Vite only exposes
# VITE_-prefixed vars). Real working default (not a secret, just a public bucket
# URL) so any plain `docker build .` still produces a working image; the GCP
# path overrides it explicitly via --build-arg (see cloudbuild.yaml / build.sh).
ARG VITE_ASSET_BASE_URL=https://upskiller-website.s3.fr-par.scw.cloud/upskiller
ENV VITE_ASSET_BASE_URL=${VITE_ASSET_BASE_URL}

# Build the main website
RUN npm run build -w upskiller

# Production stage with Nginx
FROM nginx:alpine

# Pick up patched Alpine packages (e.g. expat) not yet baked into the base image tag
RUN apk update && apk upgrade --no-cache

# Copy built assets from builder stage
COPY --from=builder /app/upskiller/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG PORT=8080
EXPOSE ${PORT}

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
