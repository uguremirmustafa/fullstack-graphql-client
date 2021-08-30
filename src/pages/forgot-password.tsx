import { Box, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import NextLink from 'next/link';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface Props {}

const ForgotPassword = (props: Props) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ values, handleChange, isSubmitting }) =>
            complete ? (
              <Box>
                We are checking our database for this email, you will receive an email to reset your
                password!
              </Box>
            ) : (
              <Form>
                <InputField name="email" placeholder="email" label="Email" type="email" />
                <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                  get a new password
                </Button>
                <Box mt={4}>
                  <NextLink href="/login">
                    <Link textColor="blue.400">you already have credientials, login 🔑</Link>
                  </NextLink>
                </Box>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
