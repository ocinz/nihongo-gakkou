# Base image
FROM node:18-alpine AS base

ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG NODE_ENV
ARG NEXTAUTH_URL
ARG AUTH_TRUST_HOST
ARG PORT
ARG DATABASE_URL

ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV NODE_ENV=$NODE_ENV
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL
# Set working directory
WORKDIR /app

COPY . .

# ENV key=value

RUN npm install 
RUN npm exec auth secret
RUN npx prisma generate 
RUN npm run build

# Expose the application port
EXPOSE ${PORT}

# Start the application with port 3001
CMD ["npm", "run", "start"]
