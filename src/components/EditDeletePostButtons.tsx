import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery, usePostQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

interface Props {
  id: number;
}

export const EditDeletePostButtons = ({ id }: Props) => {
  const router = useRouter();
  const [, deletePost] = useDeletePostMutation();
  const [{ data, fetching }] = useMeQuery();
  const [{ data: postData }] = usePostQuery({ variables: { id } });
  if (fetching) {
    <Box>
      <Button isLoading></Button>
    </Box>;
  }
  if (!data?.me) {
    <Box>User not found</Box>;
  }
  return (
    <>
      {data?.me?.id === postData?.post?.creatorId ? (
        <Box>
          <NextLink href={`/post/edit/${id}`}>
            <IconButton aria-label="delete post" icon={<EditIcon />} size="sm" mr="2" />
          </NextLink>
          <IconButton
            aria-label="delete post"
            icon={<DeleteIcon />}
            onClick={() => {
              deletePost({ id });
              router.back();
            }}
            size="sm"
          />
        </Box>
      ) : null}
    </>
  );
};
