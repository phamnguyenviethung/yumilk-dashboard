import { useGetPostListQuery } from '@/apis/postApi';
import PostTable from '@/features/Post/PostTable';
import { Alert, AlertIcon, Box, Button, Flex, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
  const { data: posts, error, isLoading } = useGetPostListQuery();

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('/manage/post/create');
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' mt='20'>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        Unable to fetch posts. Please try again later.
      </Alert>
    );
  }

  return (
    <Box boxSize='full'>
      <Flex justifyContent='flex-end'>
        <Button colorScheme='pink' my={2} onClick={handleCreatePost}>
          Tạo bài viết
        </Button>
      </Flex>
      <PostTable data={posts} />
    </Box>
  );
};

export default PostList;
