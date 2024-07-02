import formatMoney from '@/utils/formatMoney';
import { Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';

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
          <Text>{formatMoney(data.totalPrice)}</Text>
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
      </VStack>
    </Box>
  );
};

export default PriceInfo;
