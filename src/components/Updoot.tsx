import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Button, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface Props {
  post: PostSnippetFragment;
}

export const Updoot = ({ post }: Props) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');

  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" gridGap="1.5">
      <IconButton
        aria-label="upvote"
        size="sm"
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({ postId: post.id, value: 1 });
          setLoadingState('not-loading');
        }}
        icon={<ChevronUpIcon />}
        isLoading={loadingState === 'updoot-loading'}
        colorScheme={post.voteStatus === 1 ? 'telegram' : undefined}
      />
      {post.points}
      <IconButton
        aria-label="downvote"
        size="sm"
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({ postId: post.id, value: -1 });
          setLoadingState('not-loading');
        }}
        icon={<ChevronDownIcon />}
        isLoading={loadingState === 'downdoot-loading'}
        colorScheme={post.voteStatus === -1 ? 'orange' : undefined}
      />
    </Flex>
  );
};
