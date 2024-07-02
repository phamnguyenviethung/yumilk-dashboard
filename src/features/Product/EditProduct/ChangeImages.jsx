import {
  useChangeStatusProductImageMutation,
  useDeleteProductImagesMutation,
  useGetProductImagesQuery,
} from '@/apis/productApi';
import axiosInstance from '@/utils/axiosInstance';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function UpdateStatusImage({ currentStatus, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changImgStatus] = useChangeStatusProductImageMutation();
  const cancelRef = useRef();
  const toast = useToast();

  const handeClick = async () => {
    try {
      const res = await changImgStatus({ id, body: !currentStatus });
      if (res.error) throw res.error.data;
      onClose();
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Button colorScheme={currentStatus ? 'red' : 'green'} onClick={onOpen}>
        {currentStatus ? 'Ẩn' : 'Hiện'}
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Thông báo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Ảnh sẽ được {currentStatus ? 'ẩn' : 'hiện'} khỏi trang thông tin của
            sản phẩm
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='pink' onClick={handeClick}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function DeleteImage({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteImgStatus] = useDeleteProductImagesMutation();
  const cancelRef = useRef();
  const toast = useToast();
  const handeClick = async () => {
    try {
      const res = await deleteImgStatus(id);
      if (res.error) throw res.error.data;
      onClose();
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} variant='outline'>
        Xoá
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Thông báo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn có muốn xoá ảnh này ?</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='pink' onClick={handeClick}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const UploadImg = ({ productID, refetch }) => {
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const toast = useToast();
  const token = useSelector(state => state.auth?.userToken?.accessToken);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async event => {
    try {
      setLoading(true);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('images', file);

      const res = await axios.post(
        import.meta.env.VITE_API_ENDPOINT + `/api/products/${productID}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.error) throw res.error.data;
      refetch();

      setLoading(false);
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };
  return (
    <>
      <input
        type='file'
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
      <Button
        colorScheme='blue'
        size='md'
        onClick={handleClick}
        isLoading={loading}
        isDisabled={loading}
      >
        Thêm ảnh
      </Button>
    </>
  );
};

const ChangeImages = ({ id }) => {
  const { data, isLoading, refetch } = useGetProductImagesQuery(id);
  const [index, setIndex] = useState(0);
  if (isLoading) return <p>loading...</p>;
  return (
    <VStack gap='6' boxSize='full'>
      <Center w='full' h='250px'>
        <Image h='full' src={data[index].imageUrl} borderRadius='10px' />
      </Center>
      <Box w='full' textAlign='center'>
        <Text color='gray.400'>
          {index + 1}/{data.length}
        </Text>
      </Box>

      <HStack as={Center} gap='2' w='full'>
        <UpdateStatusImage
          currentStatus={data[index].isActive}
          id={data[index].id}
        />
        <DeleteImage id={data[index].id} />
      </HStack>
      <Center w='full'>
        <UploadImg productID={id} refetch={refetch} />
      </Center>
      <ButtonGroup as={Center} w='full'>
        <Button
          variant='outline'
          colorScheme='pink'
          size='sm'
          isDisabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          Trở lại
        </Button>
        <Button
          variant='outline'
          colorScheme='pink'
          size='sm'
          isDisabled={index === data.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          Tiếp theo
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default ChangeImages;
