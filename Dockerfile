# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
