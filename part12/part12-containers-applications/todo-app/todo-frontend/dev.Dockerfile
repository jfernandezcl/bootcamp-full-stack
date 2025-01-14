# Usamos una imagen base de Node.js para el frontend
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos del frontend al contenedor
COPY . .

# Instalamos las dependencias para el desarrollo
RUN npm install

# Exponemos el puerto 3000 donde la aplicación React estará corriendo
EXPOSE 3000

# Iniciamos el servidor de desarrollo de React
CMD ["npm", "start"]
