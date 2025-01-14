# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala nodemon para reiniciar el servidor durante el desarrollo
RUN npm install -g nodemon

# Copia el código de la aplicación
COPY . .

# Expone el puerto para el backend
EXPOSE 3000

# Usa nodemon para iniciar el servidor
CMD ["nodemon", "src/index.js"]
