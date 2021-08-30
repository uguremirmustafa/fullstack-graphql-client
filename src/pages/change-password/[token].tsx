import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import { Layout } from '../../components/Layout';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';
const ChangePassword: NextPage<{}> = () => {
  const { query } = useRouter();
  const token = query.token as string;
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({ token, newPassword: values.newPassword });
            if (response.data?.changePassword?.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword?.user) {
              console.log(response.data.changePassword.user);
              router.push('/');
            }
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
              {tokenError ? (
                <Box>
                  <Box textColor="red.500">{tokenError}</Box>
                  <NextLink href="/forgot-password">
                    <Link textColor="blue.400">👉 renew token</Link>
                  </NextLink>
                </Box>
              ) : null}

              <Button type="submit" colorScheme="orange" mt={4} isLoading={isSubmitting}>
                change password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
