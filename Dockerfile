# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

COPY . .

# ENV PORT=3000
# ENV key=value

RUN npm install 
RUN npm exec auth secret
RUN npx prisma generate 
RUN npm run build

# Expose the application port
EXPOSE ${PORT}

# Start the application with port 3001
CMD ["npm", "run", "start"]
