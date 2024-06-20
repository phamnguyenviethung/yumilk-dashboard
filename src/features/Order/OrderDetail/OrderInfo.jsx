import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Box, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
const DetailsText = ({ data, isTag, tagColor, color }) => {
  return (
    <HStack
      w='full'
      justifyContent='space-between'
      fontSize={{
        base: '1rem',
        lg: '1.1rem',
      }}
    >
      <Text flex='1' fontWeight='400'>
        {data.name}:
      </Text>
      {isTag ? (
        <Tag size={['md', 'md', 'lg']} colorScheme={tagColor}>
          {data.value}
        </Tag>
      ) : (
        <Text
          flex='2'
          textAlign='right'
          fontWeight='500'
          color={color ? color : 'gray.800'}
        >
          {data.value}
        </Text>
      )}
    </HStack>
  );
};

const OrderInfo = ({ data }) => {
  const orderInfo = [
    {
      name: 'Mã đơn hàng',
      value: data.orderId,
    },
    {
      name: 'Ngày đặt hàng',
      value: dayjs(data.createdAt).format('HH:mm DD/MM/YYYY'),
    },
    {
      name: 'Ghi chú',
      value: data.note,
      color: 'red.500',
    },
    {
      name: 'Phương thức thanh toán',
      value:
        data.paymentMethod === order.COD_PAYMENT
          ? 'Thanh toán bằng tiền mặt'
          : 'Thanh toán qua ngân hàng',
    },
    {
      name: 'Tổng tiền',
      value: formatMoney(data.totalAmount),
      isTag: true,
      tagColor: 'pink',
    },

    {
      name: 'Trạng thái',
      value: order[data.orderStatus.toUpperCase()].text,
      isTag: true,
      tagColor: order[data.orderStatus.toUpperCase()].color,
    },
  ];
  return (
    <Box p='4' borderRadius='10px'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600'>
        Thông tin đơn hàng
      </Heading>
      <VStack gap='4' w='full'>
        {orderInfo.map(d => {
          return <DetailsText key={d.name} data={d} {...d} />;
        })}
      </VStack>
    </Box>
  );
};

export default OrderInfo;
