import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { PiStarFill } from 'react-icons/pi';

const StarList = ({ star }) => {
  return (
    <HStack spacing='2' minH='50px'>
      {[1, 2, 3, 4, 5].map(n => {
        if (n <= star) {
          return (
            <Icon
              key={n}
              as={PiStarFill}
              fontSize='1.2rem'
              color='yellow.400'
            />
          );
        }
        return <></>;
      })}
    </HStack>
  );
};

const ReviewDetail = ({ data }) => {
  if (data.items.length === 0) return <></>;

  return (
    <Box p='4' borderRadius='16px' boxSize='full' bgColor='brand.secondary'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600' mb='8'>
        Đánh giá
      </Heading>
      <VStack w='full' spacing={4}>
        {data.items.map(product => {
          return (
            <Box
              w='full'
              key={product.id}
              border='0.4px solid'
              borderColor='gray.400'
              p='2'
              borderRadius={8}
            >
              <Text
                fontWeight='500'
                fontSize={{
                  base: '0.9rem',
                  lg: '1rem',
                }}
              >
                {product.productName}
              </Text>
              <StarList star={product.rating} />
              <Text fontWeight='500' color='gray.400' fontSize='0.85rem'>
                {dayjs(product.createdAt).format('HH:mm DD/MM/YYYY')}
              </Text>
              <Text fontWeight='600' color='pink.300' fontSize='1.4rem'>
                {product.review}
              </Text>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default ReviewDetail;
