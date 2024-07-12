import PostEditForm from '@/features/Post/PostEditForm';
import { Box, Heading } from '@chakra-ui/react';

const CreatePost = () => {
  return (
    <Box p={5}>
      <Heading as='h2' size='lg' mb={5}>
        Tạo bài viết
      </Heading>
      <PostEditForm isAdd />
    </Box>
  );
};

export default CreatePost;
