import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface Props {}

const Register = (props: Props) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            if (response.data?.register?.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register?.user) {
              console.log(response.data.register.user);
              router.push('/');
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <InputField name="username" placeholder="username" label="Username" />
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
