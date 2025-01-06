import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error);
      throw error;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        JSON.stringify(accessToken)
      );
    } catch (error) {
      console.error('Error al guardar el token de acceso:', error);
      throw error;
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error('Error al eliminar el token de acceso:', error);
      throw error;
    }
  }
}

export default AuthStorage;
