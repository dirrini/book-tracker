# --- Base Stage ---
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# --- Development Stage ---
FROM base AS development
# Install all dependencies (including devDependencies)
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# --- Production Stage ---
FROM base AS production
# Only install production dependencies
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 5000
CMD ["sh", "-c", "node database/init-db.js && node src/app.js"]