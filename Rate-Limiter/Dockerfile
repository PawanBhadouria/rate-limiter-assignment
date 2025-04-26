# Use Node.js image
FROM node:18

WORKDIR /app

# Copy package.json first to leverage caching
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
