import { useGetOrderDetailQuery } from '@/apis/orderApi';
import OrderInfo from '@/features/Order/OrderDetail/OrderInfo';
import { Box, Container, Stack, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id);
  if (isLoading) return <p>loading</p>;
  return (
    <Container maxW='container.xl'>
      <Stack
        w='full'
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        gap='2'
      >
        <Box flex='2' w='full'>
          1
        </Box>
        <Box flex='1' w='full'>
          <VStack gap='4'>
            <OrderInfo data={data} />
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default OrderDetail;
