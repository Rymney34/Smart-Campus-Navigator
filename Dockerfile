# Use Node base image
FROM node:18

# Set work directory
WORKDIR /app

# Copy package.json files from BackEnd
COPY BackEnd/package*.json ./BackEnd/

# Install dependencies
RUN cd BackEnd && npm install

# Copy the rest of the backend code
COPY BackEnd ./BackEnd

# Switch to that directory for runtime
WORKDIR /app/BackEnd

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]