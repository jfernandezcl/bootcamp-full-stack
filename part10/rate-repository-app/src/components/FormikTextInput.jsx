import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

const FormikTextInput = ({ style, error, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <TextInput
        style={[styles.input, style]} // Se aplica el estilo condicional
        {...field}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}  {/* Mensaje de error */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: '#d73a4a', // Color rojo para los mensajes de error
    fontSize: 12,
  },
});

export default FormikTextInput;
