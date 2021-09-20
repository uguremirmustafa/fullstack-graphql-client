import { Box, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
interface Props {}

const Post = (props: Props) => {
  const router = useRouter();
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }
  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Flex w="full" justify="space-between">
          <Link onClick={() => router.back()}>👈 back to home </Link>
        </Flex>
        <Box>Couldnt find the post</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex w="full" justify="space-between">
        <Link onClick={() => router.back()}>👈 back to home </Link>
      </Flex>
      <Heading>{data?.post?.title}</Heading>
      <Flex width="full" justify="space-between">
        <Text>{data?.post?.createdAt}</Text>
        <Text>posted by {data?.post?.creator.username}</Text>
      </Flex>
      <Divider my="2" />
      <Text mb="2">{data?.post?.text}</Text>

      <EditDeletePostButtons id={data?.post?.id} />
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true, neverSuspend: true })(Post);
