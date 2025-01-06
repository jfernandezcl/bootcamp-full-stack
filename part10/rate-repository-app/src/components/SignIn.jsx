import React from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Para validaciones si es necesario
import FormikTextInput from './FormikTextInput.jsx'; // Importamos el componente FormikTextInput

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  // Función que se ejecuta al enviar el formulario
  const onSubmit = (values) => {
    console.log(values); // Imprimimos los valores del formulario
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry // Esto oculta el texto de la contraseña
            />
            <Button title="Sign In" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
});

export default SignIn;
