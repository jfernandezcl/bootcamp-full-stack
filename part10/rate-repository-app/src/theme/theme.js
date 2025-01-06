import { Platform } from 'react-native';

// Definir una fuente predeterminada para cada plataforma
const theme = {
  text: {
    fontFamily: Platform.OS === 'android' ? 'Roboto' : Platform.OS === 'ios' ? 'Arial' : 'System',
    fontSize: 16,
  },
};

export default theme;
