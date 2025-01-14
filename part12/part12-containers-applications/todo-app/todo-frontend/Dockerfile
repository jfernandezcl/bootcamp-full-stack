# Usamos una imagen base de Node.js
FROM node:16 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de la aplicación al contenedor
COPY . .

# Instalamos las dependencias y construimos la aplicación para producción
RUN npm install
RUN npm run build

# Ahora configuramos el contenedor para producción
FROM nginx:alpine

# Copiamos los archivos estáticos generados al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
