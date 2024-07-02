import { useGetOrderDetailQuery } from '@/apis/orderApi';
import ChangeStatusButton from '@/features/Order/OrderDetail/ChangeStatusButton';
import CustomerInfo from '@/features/Order/OrderDetail/CustomerInfo';
import OrderInfo from '@/features/Order/OrderDetail/OrderInfo';
import PriceInfo from '@/features/Order/OrderDetail/PriceInfo';
import ProductList from '@/features/Order/OrderDetail/ProductList';
import ShippingTracking from '@/features/Order/OrderDetail/ShippingTracking';
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id);
  if (isLoading) return <p>loading</p>;
  return (
    <Container maxW='container.xl' pb='16'>
      <Box w='full' p='2' mb='4'>
        <Stack
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          justifyContent='space-between'
          gap={{
            base: 6,
            lg: 0,
          }}
        >
          <Box
            flex='3'
            w='full'
            fontWeight='500'
            color='gray.500'
            fontSize='0.9rem'
          >
            <Heading as='h6' fontSize='1.6rem' color='white' mb='2'>
              Thông tin đặt hàng
            </Heading>
            <Text>Mã đơn hàng: {id}</Text>
            <Text>
              Ngày tạo: {dayjs(data.createdAt).format('HH:mm DD/MM/YYYY')}
            </Text>
          </Box>
          <Flex
            flex='1'
            justifyContent={{
              base: 'center',
              lg: 'flex-end',
            }}
            alignItems='center'
            w='full'
          >
            <ChangeStatusButton id={id} data={data} />
          </Flex>
        </Stack>
      </Box>
      <Stack
        w='full'
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        gap='2'
        alignItems='flex-start'
      >
        <Box flex='4' w='full'>
          <VStack gap='4' boxSize='full'>
            <ProductList data={data} />
            <PriceInfo data={data} />
          </VStack>
        </Box>
        <Box flex='3' w='full'>
          <VStack gap='4' boxSize='full'>
            <OrderInfo data={data} id={id} />
            <CustomerInfo data={data} id={id} />
          </VStack>
        </Box>
      </Stack>
      <Box>
        <ShippingTracking id={id} />
      </Box>
    </Container>
  );
};

export default OrderDetail;
