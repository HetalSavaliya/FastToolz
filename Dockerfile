# Use official Node.js LTS image
FROM node:18

# Install required system packages (qpdf and libreoffice if needed)
RUN apt-get update && \
    apt-get install -y qpdf libreoffice && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Build your Next.js app
RUN NEXT_DISABLE_ESLINT=true npm run build

# Expose the port your app will run on
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
