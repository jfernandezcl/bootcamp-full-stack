import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required('Repository owner username is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating cannot exceed 100')
      .required('Rating is required'),
    text: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await createReview({ variables: { review: values } });
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.error('Error creating review:', e);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner username"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
          />
          {errors.ownerName && <Text style={styles.error}>{errors.ownerName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
          />
          {errors.repositoryName && <Text style={styles.error}>{errors.repositoryName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Rating (0-100)"
            keyboardType="numeric"
            value={values.rating}
            onChangeText={handleChange('rating')}
          />
          {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Review"
            multiline
            value={values.text}
            onChangeText={handleChange('text')}
          />

          <Button onPress={handleSubmit} title="Submit Review" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default ReviewForm;
