# ============================
# Stage 1: Build the app
# ============================
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app (disable eslint check in build)
RUN NEXT_DISABLE_ESLINT=true npm run build


# ============================
# Stage 2: Run the app
# ============================
FROM node:18-slim AS runner

# Install required system packages (ffmpeg + python + qpdf + libreoffice)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 python3-pip python3-venv \
    libreoffice libreoffice-writer \
    qpdf && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir pdf2docx && \
    rm -rf /var/lib/apt/lists/*

# Add venv bin to PATH
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Copy only needed files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./package.json

# Expose production port
EXPOSE 5000

# Run Next.js in production mode
CMD ["npm", "start"]
