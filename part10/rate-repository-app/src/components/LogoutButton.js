import authStorage from '../utils/authStorageInstance';

const LogoutButton = () => {
  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    console.log('Token eliminado. Usuario desconectado.');
    // Redirigir al usuario a la pantalla de inicio de sesión
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default LogoutButton;
