# Usamos una imagen base de Node.js para el backend
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos del backend al contenedor
COPY . .

# Instalamos las dependencias para el desarrollo
RUN npm install

# Exponemos el puerto 5000 donde la API del backend estará corriendo
EXPOSE 5000

# Iniciamos el servidor de desarrollo del backend
CMD ["npm", "run", "dev"]
