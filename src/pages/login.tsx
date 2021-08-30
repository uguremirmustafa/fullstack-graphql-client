import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';
interface Props {}

const Login = (props: Props) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login?.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login?.user) {
              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                router.push('/');
              }
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                login
              </Button>
              <Box mt={4}>
                <NextLink href="/forgot-password">
                  <Link textColor="blue.400">😥 forgot password</Link>
                </NextLink>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
