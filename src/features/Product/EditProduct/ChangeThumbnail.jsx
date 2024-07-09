import { useUpdateProductMutation } from '@/apis/productApi';
import uploadImgToImgur from '@/utils/uploadImageToImgur';
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

const ChangeThumbnail = ({ data }) => {
  const [url, setUrl] = useState(data?.thumbnail);
  const [loading, setLoading] = useState(false);
  const [updateProductAPI] = useUpdateProductMutation();
  const hiddenFileInput = useRef(null);
  const toast = useToast();
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await updateProductAPI({
        id: data.id,
        thumbnail: url,
      });
      if (res.error) throw res.error.data;
      toast({
        title: 'Đổi ảnh thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: 'Đổi ảnh thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async event => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', file.name);
        formData.append('description', file.name);
        const res = await uploadImgToImgur(formData);
        setLoading(false);

        setUrl(res.data.data.link);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Box w='full'>
      <VStack gap={8}>
        <Box>
          <Image
            w='full'
            src={url}
            fallbackSrc='https://placehold.co/400'
            borderRadius='6px'
          />
        </Box>
        <input
          type='file'
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
        <ButtonGroup alignSelf='flex-end'>
          <Button
            colorScheme='pink'
            size='md'
            onClick={handleClick}
            isLoading={loading}
            isDisabled={loading}
            variant='outline'
          >
            Đổi ảnh
          </Button>
          <Button
            colorScheme='pink'
            onClick={handleSave}
            isLoading={loading}
            isDisabled={loading}
          >
            Lưu
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default ChangeThumbnail;
