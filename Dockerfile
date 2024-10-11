FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . /app

# Build your application (if applicable)
RUN npm run build

# Expose the port
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]