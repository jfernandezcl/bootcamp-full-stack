import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

const FormikTextInput = ({ style, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <TextInput
        style={[styles.input, style]}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text style={styles.error}>{meta.error}</Text>
      ) : null}
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
    color: 'red',
    fontSize: 12,
  },
});

export default FormikTextInput;
