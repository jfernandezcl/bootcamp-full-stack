import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Para validaciones
import FormikTextInput from './FormikTextInput'; // Importamos el componente FormikTextInput

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
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              error={touched.username && errors.username}
              style={touched.username && errors.username ? styles.inputError : null}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <FormikTextInput
              name="password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              error={touched.password && errors.password}
              style={touched.password && errors.password ? styles.inputError : null}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  inputError: {
    borderColor: '#d73a4a', // Rojo para indicar un error
  },
  error: {
    color: '#d73a4a', // Rojo para el mensaje de error
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignIn;

