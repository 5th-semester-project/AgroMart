# Stage 1: Build the Next.js app
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Next.js application files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
