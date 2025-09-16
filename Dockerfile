# ============================
# Stage 1: Build the app
# ============================
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build Next.js app (disable eslint check in build)
RUN NEXT_DISABLE_ESLINT=true npm run build


# ============================
# Stage 2: Run the app
# ============================
FROM node:18-slim AS runner

# Install only required system packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice libreoffice-writer qpdf && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only needed files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Expose production port
EXPOSE 5000

# Start Next.js production server
CMD ["npm", "start"]
