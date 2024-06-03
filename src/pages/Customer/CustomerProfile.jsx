import { useGetCustomerByIDQuery } from '@/apis/customerApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ProfileBox from '@/features/Customer/Profile/ProfileBox';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const CustomerProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCustomerByIDQuery(id);

  if (isLoading)
    return (
      <Center h='full'>
        <CircleLoading />
      </Center>
    );

  if (isError) {
    return (
      <Box>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Không có dữ liệu</AlertTitle>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Flex
        w='full'
        justifyContent='space-around'
        flexDirection={['column', 'column', 'row']}
      >
        <Box
          flex='3'
          bgColor='gray.700'
          p={2}
          borderRadius='10px'
          mr={[0, 0, 1]}
          py={8}
          px={4}
        >
          <ProfileBox data={data} />
        </Box>
        <Box flex='5'>Address</Box>
      </Flex>

      <Box>Order table</Box>
    </>
  );
};

export default CustomerProfile;
