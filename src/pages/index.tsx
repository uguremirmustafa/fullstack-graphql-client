import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface Props {}

const Home = (props: Props) => {
  const [variables, setVariables] = useState({ limit: 15, cursor: null as null | string });
  const [{ data, fetching }] = usePostsQuery({ variables });
  // console.log(variables);

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
            {data?.posts.posts.map((post) => (
              <Box key={post.id} p="5" shadow="md" borderWidth="1px">
                {post.creator.username}
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt="4">{post.textSnippet}</Text>
              </Box>
            ))}
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
