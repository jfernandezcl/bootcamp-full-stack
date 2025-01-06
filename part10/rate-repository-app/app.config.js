import 'dotenv/config';

export default {
  expo: {
    name: 'YourAppName',
    slug: 'your-app-slug',
    version: '1.0.0',
    extra: {
      apolloUri: process.env.APOLLO_URI, // Cargamos la variable de entorno
    },
  },
};
