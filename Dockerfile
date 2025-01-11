# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

COPY . .
RUN npm install 
RUN npm exec auth secret
RUN npx prisma generate 
RUN npm run build

# Set environment variable for the port
ENV PORT=3001

# Expose the application port
EXPOSE ${PORT}

# Start the application
CMD ["npm", "run", "start", "-p", "${PORT}"]
