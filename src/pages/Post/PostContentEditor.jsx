import { useGetPostDetailQuery } from '@/apis/postApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import PostEditForm from '@/features/Post/PostEditForm';
import { Box, Center, Heading } from '@chakra-ui/react';
import ImageUploader from 'quill-image-uploader';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useParams } from 'react-router-dom'; // Import useNavigate

Quill.register('modules/imageUploader', ImageUploader);

const PostContentEditor = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(id);

  if (isLoading)
    return (
      <Center>
        <CircleLoading />
      </Center>
    );

  return (
    <Box p={5}>
      <Heading as='h2' size='lg' mb={5}>
        Edit Post
      </Heading>
      <PostEditForm data={data} />
    </Box>
  );
};

export default PostContentEditor;
