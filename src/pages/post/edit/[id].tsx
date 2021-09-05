import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import Wrapper from '../../../components/Wrapper';
import { useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../../utils/useGetPostFromUrl';
interface Props {}

const Edit = (props: Props) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetPostFromUrl();
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }
  //------------------------------------------
  // https://youtu.be/I6ypD7qv3Z8?t=39742
  //------------------------------------------

  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: data?.post?.title, text: data?.post?.text }}
          onSubmit={async (values, { setErrors }) => {
            if (data?.post && values.title && values.text) {
              await updatePost({ id: data?.post?.id, text: values.text, title: values.title });
              router.back();
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Post Title" />
              <Box mt={4}>
                <InputField textarea name="text" placeholder="text..." label="Post Body" />
              </Box>
              <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                update post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(Edit);
