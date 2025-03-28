# Use Node.js base image
FROM node

# Set working directory
WORKDIR /app

# Copy dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Run your app directly
CMD ["node", "app.js"]