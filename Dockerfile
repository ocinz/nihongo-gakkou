# Base image
FROM node:18-alpine

# set env variables
ENV AUTH_SECRET="G/n9q/xi1PKS/vIgssmzz34d9cYf6LJ1rr0ZostUYms="
ENV AUTH_GOOGLE_ID="104000000000000000000"
ENV AUTH_GOOGLE_SECRET=""
ENV DATABASE_URL="postgresql://user:password@domain.comm/database?schema=schema"

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm build

# Expose the port
EXPOSE 3000



# Start the application
CMD ["npm", "start"]
