import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import numeral from 'numeral';

const PriceInfo = ({ data }) => {
  return (
    <Box p='4' borderRadius='16px' boxSize='full' bgColor='brand.secondary'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600' mb='8'>
        Chi phí
      </Heading>
      <VStack w='full'>
        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='400' fontSize='0.95rem'>
            Tạm tính:
          </Text>
          <Text>{formatMoney(data.totalPriceBeforeDiscount)}</Text>
        </Flex>

        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='400' fontSize='0.95rem'>
            Sử dụng voucher:
          </Text>
          <Text color='red.400'>-{formatMoney(data.voucherDiscount)}</Text>
        </Flex>
        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='400' fontSize='0.95rem'>
            Sử dụng xu:
          </Text>
          <Text color='red.400'>-{formatMoney(data.pointDiscount)}</Text>
        </Flex>
        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='400' fontSize='0.95rem'>
            Giá sau giảm giá:
          </Text>
          <Text>{formatMoney(data.totalPriceAfterDiscount)}</Text>
        </Flex>
        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='400' fontSize='0.95rem'>
            Phí vận chuyển:
          </Text>
          <Text>{formatMoney(data.shippingFee)}</Text>
        </Flex>
        <Divider />
        <Flex w='full' justifyContent='space-between'>
          <Text fontWeight='600'>Tổng tiền:</Text>
          <Text fontSize='1.4rem' fontWeight='700' color='pink.400'>
            {formatMoney(data.totalAmount)}
          </Text>
        </Flex>
        {data.orderStatus === order.DELIVERED.name && (
          <Flex w='full' justifyContent='space-between'>
            <Text fontWeight='600' fontSize='1.1rem'>
              Số xu nhận được
            </Text>
            <Text color='green.400' fontWeight='600'>
              {numeral(data.recievingPoint).format('+0,0')}
            </Text>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default PriceInfo;
