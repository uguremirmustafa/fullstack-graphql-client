import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Updoot } from '../components/Updoot';
import { useDeletePostMutation, useMeQuery, usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface Props {}

const Home = (props: Props) => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string });
  const [{ data, fetching }] = usePostsQuery({ variables });
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return (
      <Layout>
        <Text>your data is missing for some reason</Text>
      </Layout>
    );
  }

  https: return (
    <Layout>
      <Box>
        {!data && fetching ? (
          'loading'
        ) : (
          <Stack spacing="4">
            {data?.posts.posts.map((post) =>
              !post ? null : (
                <Flex
                  gridGap="4"
                  alignItems="center"
                  key={post.id}
                  p="5"
                  shadow="md"
                  borderWidth="1px"
                >
                  <Updoot post={post} />
                  <Box w="full">
                    {post.creator.username}
                    <NextLink href={`/post/${post.id}`}>
                      <Link>
                        <Heading fontSize="xl">{post.title}</Heading>
                      </Link>
                    </NextLink>
                    <Flex alignItems="center">
                      <Text mt="4" flex={1}>
                        {post.textSnippet}
                      </Text>
                      {meData?.me?.id === post.creator.id ? (
                        <Box>
                          <NextLink href={`/post/edit/${post.id}`}>
                            <IconButton
                              aria-label="delete post"
                              icon={<EditIcon />}
                              size="sm"
                              mr="2"
                            />
                          </NextLink>
                          <IconButton
                            aria-label="delete post"
                            icon={<DeleteIcon />}
                            onClick={() => {
                              deletePost({ id: post.id });
                            }}
                            size="sm"
                          />
                        </Box>
                      ) : null}
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
          </Stack>
        )}
      </Box>
      {data && data.posts.hasMore ? (
        <Button
          isLoading={fetching}
          my="8"
          onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            });
          }}
        >
          load more
        </Button>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true, neverSuspend: true })(Home);
