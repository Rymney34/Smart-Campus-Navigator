# Use Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install dependencies from root package.json
RUN npm install

# Copy the rest of the project (including BackEnd/)
COPY . .

# Set working directory to BackEnd
WORKDIR /app/BackEnd

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]