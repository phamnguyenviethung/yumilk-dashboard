import {
  useGetCustomerAddressQuery,
  useGetCustomerByIDQuery,
  useGetCustomerOrderHistoryQuery,
} from '@/apis/customerApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ProfileBox from '@/features/Customer/Profile/ProfileBox';
import OrderTable from '@/features/Order/OrderTable';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const CustomerProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCustomerByIDQuery(id);
  const { data: addressData, isLoading: addressLoading } =
    useGetCustomerAddressQuery(id);
  const { data: orderData, isLoading: orderLoading } =
    useGetCustomerOrderHistoryQuery({
      id,
      params: {
        pageSize: 999999999,
      },
    });

  if (isLoading || addressLoading || orderLoading)
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
    <VStack w='full' gap='4'>
      <Flex
        gap='4'
        w='full'
        justifyContent='space-around'
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box
          flex='3'
          bgColor='brand.secondary'
          p={2}
          borderRadius='10px'
          mr={[0, 0, 1]}
          py={8}
          px={4}
        >
          <ProfileBox data={data} />
        </Box>
        <VStack w='full' flex='5' gap='4'>
          {addressData.map(address => {
            return (
              <Box
                key={address.id}
                w='full'
                fontSize={{
                  base: '1rem',
                  lg: '1.1rem',
                }}
                p={4}
                bgColor='brand.secondary'
                border='1px solid'
                borderRadius='8px'
                minH='120px'
                _hover={{
                  borderColor: 'pink.400',
                }}
              >
                <Flex>
                  <Box flex='1'>
                    {address.isDefault && (
                      <Tag mb={2} colorScheme='pink'>
                        Địa chỉ mặc định
                      </Tag>
                    )}
                    <Text fontWeight='bold'>{address.receiverName}</Text>
                    <Text>{address.receiverPhone}</Text>
                    <Text
                      mt={4}
                    >{`${address.address} ${address.wardName} ${address.districtName} ${address.provinceName}`}</Text>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </Flex>

      <Box boxSize='full' h='500px'>
        <OrderTable data={orderData } />
      </Box>
    </VStack>
  );
};

export default CustomerProfile;
