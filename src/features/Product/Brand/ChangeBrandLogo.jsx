import uploadImgToImgur from '@/utils/uploadImageToImgur';
import { Box, Button, Image, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const ChangeBrandLogo = ({ logo, setLogo }) => {
  const [url, setUrl] = useState(logo);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);

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
        setLogo(res.data.data.link);
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
        <Box boxSize='250px'>
          <Image
            w='full'
            src={url}
            fallbackSrc='https://placehold.co/300'
            borderRadius='6px'
          />
        </Box>
        <input
          type='file'
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
        <Button
          colorScheme='pink'
          size='md'
          onClick={handleClick}
          isLoading={loading}
          isDisabled={loading}
        >
          Đổi ảnh
        </Button>
      </VStack>
    </Box>
  );
};

export default ChangeBrandLogo;
