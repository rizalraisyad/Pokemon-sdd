FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
RUN apk add --no-cache wget
COPY package.json ./
RUN npm install

# Development stage
FROM base AS development
RUN apk add --no-cache wget
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

