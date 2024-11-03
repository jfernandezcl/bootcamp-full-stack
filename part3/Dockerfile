# Use the Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the project files
COPY package*.json ./
RUN npm install
COPY . .

# Expose the application port
EXPOSE 3003

# Command to run the application
CMD ["npm", "start"]
