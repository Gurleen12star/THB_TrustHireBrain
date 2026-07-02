# Use Node.js 20 alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install packages
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Next.js dev or prod env
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the dev server by default
CMD ["npm", "run", "dev"]
