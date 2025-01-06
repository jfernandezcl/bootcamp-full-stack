import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer'; // Ajusta la ruta según sea necesario

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Creamos una función simulada (mock) para onSubmit
      const mockOnSubmit = jest.fn();

      // Renderizamos el componente SignInContainer y le pasamos el mockOnSubmit
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={mockOnSubmit} />
      );

      // Obtenemos los campos de entrada (username y password) y el botón de enviar
      const usernameInput = getByPlaceholderText('Username');  // Ajusta el placeholder si es necesario
      const passwordInput = getByPlaceholderText('Password');  // Ajusta el placeholder si es necesario
      const submitButton = getByText('Submit');  // Ajusta el texto del botón según sea necesario

      // Completamos los campos con valores válidos
      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');

      // Simulamos la pulsación del botón de enviar
      await act(async () => {
        fireEvent.press(submitButton);
      });

      // Esperamos que el mockOnSubmit haya sido llamado con los valores correctos
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1); // Asegura que la función se haya llamado una vez
        expect(mockOnSubmit).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password123',
        }); // Verifica que el primer argumento del onSubmit contenga los valores correctos
      });
    });
  });
});
