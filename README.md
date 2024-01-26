# Use a base image compatible with both ARM and x86
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["node", "app.js"]

docker build -t your-image-name .
docker run -p 8080:8080 --memory 1500m --cpus 2 your-image-name
