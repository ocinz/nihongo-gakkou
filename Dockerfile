# # Base image
# FROM node:18-alpine AS base

# # Set working directory
# WORKDIR /app

# # Stage 1: Install dependencies
# FROM base AS builder
# RUN apk add --no-cache postgresql-client

# COPY package.json package-lock.json prisma ./
# RUN npm install 
# RUN npx prisma generate 

# # # Stage 2: Build the application
# # FROM base AS builder
# COPY . .


# RUN npm run build
# # Stage 3: Prepare production image
# FROM base AS runner

# # Non-root user for security
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# # Copy required files for standalone mode
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/static ./.next/static

# # Expose the application port
# EXPOSE 3000

# # Start the application
# CMD ["node", "server.js"]


#### 
# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

COPY . .
RUN npm install 
RUN npm exec auth secret
RUN npx prisma generate 
RUN npm run build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]