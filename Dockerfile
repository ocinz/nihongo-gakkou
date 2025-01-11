# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

COPY . .
RUN npm install 
RUN npm exec auth secret
RUN npx prisma generate 
RUN npm run build

ENV PORT=3001
# Expose the application port
EXPOSE 3001

# Start the application with port 3001
CMD ["npm", "run", "start"]
