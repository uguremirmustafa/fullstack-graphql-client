import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface Props {}

export const Navbar = (props: Props) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Flex gridGap="2">
        <NextLink href="/login">
          <Link>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </Flex>
    );
  } else if (data.me) {
    body = (
      <Flex>
        <Box>{data.me.username}</Box>
        <Button
          variant="link"
          ml="2"
          isLoading={logoutFetching}
          onClick={() => {
            logout();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      // maxW="800px"
      fontWeight="bold"
      textColor="twitter.600"
      py="6"
      px="4"
      w="full"
      mx="auto"
      gridGap="4"
      justifyContent="space-between"
      shadow="md"
      mb="8"
    >
      <NextLink href="/">
        <Link>Fullstack yo!</Link>
      </NextLink>
      <Flex gridGap="2">
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/create-post">
          <Link>Create Post</Link>
        </NextLink>
      </Flex>
      {body}
    </Flex>
  );
};
