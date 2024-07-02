import formatMoney from '@/utils/formatMoney';
import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

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
            <Stack
              flexDirection={{
                base: 'column',
                lg: 'row',
              }}
              flex='3'
              alignItems='center'
            >
              <Box
                boxSize={{
                  base: '90px',
                  lg: '60px',
                }}
              >
                <Image
                  boxSize='full'
                  src={product.thumbnail}
                  fallbackSrc='https://placehold.co/80'
                  borderRadius='4px'
                />
              </Box>
              <Text
                fontWeight='600'
                fontSize={{
                  base: '0.85rem',
                  lg: '0.95rem',
                }}
              >
                {product.productName}
              </Text>
            </Stack>
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
