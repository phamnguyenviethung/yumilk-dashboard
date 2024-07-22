import { useGetGHNOrderQuery, useGetOrderDetailQuery } from '@/apis/orderApi';
import { useGetAllReviewsQuery } from '@/apis/reviewApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ChangeStatusButton from '@/features/Order/OrderDetail/ChangeStatusButton';
import CustomerInfo from '@/features/Order/OrderDetail/CustomerInfo';
import OrderInfo from '@/features/Order/OrderDetail/OrderInfo';
import OrderLog from '@/features/Order/OrderDetail/OrderLog';
import PriceInfo from '@/features/Order/OrderDetail/PriceInfo';
import ProductList from '@/features/Order/OrderDetail/ProductList';
import ReviewDetail from '@/features/Order/OrderDetail/ReviewDetail';
import {
  Alert,
  AlertIcon,
  Box,
  Center,
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
  const { data, isLoading, isError } = useGetOrderDetailQuery(id);
  const { data: reviewData, isLoading: loadingReview } = useGetAllReviewsQuery({
    OrderId: id,
  });
  const { data: ghnData, isLoading: ghnLoading } = useGetGHNOrderQuery(id);
  if (isLoading || loadingReview || ghnLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );
  if (isError)
    return (
      <Center boxSize='full'>
        <Text>Có lỗi xảy ra</Text>
      </Center>
    );
  return (
    <Box pb='16'>
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
              Ngày tạo:{' '}
              {dayjs(data.createdAt)
                .add(dayjs().utcOffset(), 'minutes')
                .format('HH:mm DD/MM/YYYY')}
            </Text>
          </Box>
          <Flex
            flex='1'
            justifyContent={{
              base: 'center',
              lg: 'flex-end',
            }}
            alignItems='center'
            minH={{
              base: '120px',
              lg: '90px',
            }}
            w='full'
          >
            <ChangeStatusButton id={id} data={data} />
          </Flex>
        </Stack>
        <Alert status='warning' mb={2} mt={8}>
          <AlertIcon />
          <Text>
            Nút <b> tạo đơn vận chuyển </b> dành cho các đơn hàng sử dụng dịch
            vụ giao hàng bên ngoài.
          </Text>
        </Alert>
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
            <ReviewDetail data={reviewData} />
          </VStack>
        </Box>
        <Box flex='3' w='full'>
          <VStack gap='4' boxSize='full'>
            <OrderInfo data={data} id={id} />
            <CustomerInfo data={data} id={id} />
          </VStack>
        </Box>
      </Stack>
      <OrderLog data={data} ghnData={ghnData} />
    </Box>
  );
};

export default OrderDetail;
