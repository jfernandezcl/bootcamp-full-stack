#!/bin/bash

# Mensaje de inicio del script
echo "Starting build process..."

# Construcción del frontend
echo "Building frontend..."
cd frontend
npm install
npm run build

# Construcción del backend
echo "Building backend..."
cd ../backend
npm install

echo "Build completed successfully!"
