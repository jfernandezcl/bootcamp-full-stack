# Usamos una imagen base de Node.js
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos del backend al contenedor
COPY . .

# Instalamos las dependencias
RUN npm install --production

# Exponemos el puerto 3000 donde corre el backend
EXPOSE 3000

# Iniciamos la aplicación
CMD ["node", "server.js"]
