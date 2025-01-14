# Etapa 1: Construcción del entorno de pruebas
FROM node:18 as test-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copia los archivos de la aplicación
COPY . .

# Ejecuta las pruebas
RUN npm test

# Etapa 2: Construcción de la imagen final
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Expone el puerto de la aplicación
EXPOSE 5173

# Inicia la aplicación
CMD ["npm", "run", "preview"]
