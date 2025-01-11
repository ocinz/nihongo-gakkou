# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS builder
RUN apk add --no-cache postgresql-client

COPY package.json package-lock.json prisma ./
RUN npm install 
RUN npx prisma generate 

# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}
# RUN echo "DATABASE_URL is $DATABASE_URL"


# # Stage 2: Build the application
# FROM base AS builder
COPY . .
# Menunggu hingga PostgreSQL siap

# RUN until pg_isready -d $DATABASE_URL; do \
#     echo 'Waiting for PostgreSQL to be ready...'; \
#     sleep 2; \
#   done; \
# RUN npm run prisma:migrate

RUN npm run build
# Stage 3: Prepare production image
FROM base AS runner

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy required files for standalone mode
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
