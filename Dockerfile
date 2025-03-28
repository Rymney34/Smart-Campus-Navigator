# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy everything from BackEnd
COPY BackEnd ./BackEnd

# Set working directory to BackEnd
WORKDIR /app/BackEnd

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]