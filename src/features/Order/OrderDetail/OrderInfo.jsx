import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Box, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
const DetailsText = ({
  data,
  isTag,
  tagColor,
  color,
  tagVariant,
  needHide,
}) => {
  return (
    <HStack
      display={needHide ? 'none' : 'flex'}
      w='full'
      justifyContent='space-between'
      fontSize={{
        base: '1rem',
        lg: '1rem',
        xl: '1.1rem',
      }}
    >
      <Text flex='1' fontWeight='400' color='gray.500'>
        {data.name}:
      </Text>
      {isTag ? (
        <Tag size='md' colorScheme={tagColor} variant={tagVariant ?? 'subtle'}>
          {data.value}
        </Tag>
      ) : (
        <Text
          flex='2'
          textAlign='right'
          fontWeight='500'
          fontSize={{
            base: '0.95rem',
            lg: '1rem',
          }}
          color={color ? color : 'gray.300'}
        >
          {data.value}
        </Text>
      )}
    </HStack>
  );
};

const OrderInfo = ({ data, id }) => {
  const orderInfo = [
    {
      name: 'Mã đơn hàng',
      value: id,
    },
    {
      name: 'Ngày đặt hàng',
      value: dayjs(data.createdAt)
        .add(dayjs().utcOffset(), 'minutes')
        .format('HH:mm DD/MM/YYYY'),
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
      value: formatMoney(data.totalPrice),
      isTag: true,
      tagColor: 'pink',
    },
    {
      name: 'Trạng thái thanh toán',
      value: data?.paymentData?.status,
      needHide: !data?.paymentData,
      isTag: true,
      tagColor: order[data.orderStatus.toUpperCase()].color,
      tagVariant: 'outline',
    },
    {
      name: 'Trạng thái đơn hàng',
      value: order[data.orderStatus.toUpperCase()].text,
      isTag: true,
      tagColor: order[data.orderStatus.toUpperCase()]?.color ?? 'cyan',
    },
  ];
  return (
    <Box p='4' borderRadius='16px' boxSize='full' bgColor='brand.secondary'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600' mb='4'>
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
