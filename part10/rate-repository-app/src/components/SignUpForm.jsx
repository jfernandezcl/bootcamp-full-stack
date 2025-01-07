import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CREATE_USER } from '../graphql/mutations'; // Asegúrate de tener la mutación definida
import { useHistory } from 'react-router-native';
import { useSignIn } from '../hooks/useSignIn'; // Hook para iniciar sesión

// Validación con Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(1, 'El nombre de usuario debe tener al menos 1 carácter')
    .max(30, 'El nombre de usuario no puede tener más de 30 caracteres')
    .required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es obligatoria'),
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER); // Mutación para crear un usuario
  const { signIn } = useSignIn(); // Hook de inicio de sesión
  const history = useHistory(); // Hook de redirección

  // Función para manejar el envío del formulario
  const handleSubmit = async (values) => {
    try {
      const { data } = await createUser({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
      await signIn({ username: values.username, password: values.password }); // Iniciar sesión
      history.push('/'); // Redirigir a la vista de repositorios
    } catch (e) {
      console.error('Error al crear el usuario', e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <Button onPress={handleSubmit} title="Registrar" />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignUpForm;
