FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npx prisma generate

# Build your application (if applicable)
RUN npm run build

# Expose the port
EXPOSE 3000

CMD ["npm", "start"]


