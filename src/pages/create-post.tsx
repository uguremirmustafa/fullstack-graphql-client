import { Box, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

interface Props {}

const CreatePost = (props: Props) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: '', text: '' }}
          onSubmit={async (values, { setErrors }) => {
            const { error } = await createPost({ input: values });
            if (!error) router.push('/');
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Post Title" />
              <Box mt={4}>
                <InputField textarea name="text" placeholder="text..." label="Post Body" />
              </Box>
              <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                create post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
