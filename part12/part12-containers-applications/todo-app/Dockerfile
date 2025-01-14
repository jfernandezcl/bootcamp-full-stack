# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Establece la variable de entorno para el backend
ENV VITE_BACKEND_URL=http://localhost:3000  # Reemplaza con la URL de tu backend

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que se ejecutará la app
EXPOSE 5173

# Inicia la aplicación
CMD ["npm", "run", "preview"]
