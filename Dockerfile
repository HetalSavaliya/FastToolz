# ============================
# Stage 1: Build
# ============================
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./

# Install all dependencies for build (dev + prod)
RUN npm ci

COPY . .

# Build Next.js app (disable eslint check)
RUN NEXT_DISABLE_ESLINT=true npm run build

# ============================
# Stage 2: Run
# ============================
FROM node:18-slim AS runner

# Install system packages for ffmpeg, python, qpdf, libreoffice
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg python3 python3-pip python3-venv \
    libreoffice libreoffice-writer qpdf && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir pdf2docx gpt4all && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="/opt/venv/bin:$PATH"
ENV NODE_ENV=production

WORKDIR /app

# Copy production dependencies only
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./package.json

EXPOSE 5000

CMD ["npm", "start"]
