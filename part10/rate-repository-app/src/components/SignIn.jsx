import React from 'react';
import { Formik } from 'formik';
import { View, Button, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { authorize } = await signIn({ username, password });
      console.log('Access token:', authorize.accessToken);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'El nombre de usuario es obligatorio.';
        }
        if (!values.password) {
          errors.password = 'La contraseña es obligatoria.';
        }
        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Nombre de usuario" />
          <FormikTextInput name="password" placeholder="Contraseña" secureTextEntry />
          <Button onPress={handleSubmit} title="Iniciar sesión" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default SignIn;

