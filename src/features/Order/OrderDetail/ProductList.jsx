import formatMoney from '@/utils/formatMoney';
import { Box, Flex, HStack, Heading, Image, Text } from '@chakra-ui/react';

const ProductList = ({ data }) => {
  return (
    <Box p='4' borderRadius='16px' boxSize='full' bgColor='brand.secondary'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600' mb='8'>
        Sản phẩm
      </Heading>
      {data.orderDetail.map(product => {
        return (
          <Flex
            w='full'
            key={product.productId}
            px='2'
            py='4'
            bgColor='brand.primary'
            _hover={{
              bgColor: 'gray.600',
            }}
            mb='4'
            borderRadius='10px'
            alignItems='center'
          >
            <HStack flex='3'>
              <Box boxSize='40px'>
                <Image
                  boxSize='full'
                  src={product.thumbnail}
                  fallbackSrc='https://placehold.co/80'
                  borderRadius='4px'
                />
              </Box>
              <Text fontWeight='600'>{product.productName}</Text>
            </HStack>
            <Box textAlign='right' flex='1'>
              x{product.quantity}
            </Box>
            <Box textAlign='right' flex='2'>
              {formatMoney(product.itemPrice)}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default ProductList;
