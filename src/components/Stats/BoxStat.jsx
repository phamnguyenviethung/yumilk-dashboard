import { Box, HStack, Icon, Text } from '@chakra-ui/react';

const BoxStats = ({ color, icon, stat, name }) => {
  return (
    <Box
      w='full'
      minH='120px'
      bgColor='brand.secondary'
      p={4}
      borderBottom='2px solid'
      borderColor={color + '.400'}
      borderRadius='4px'
    >
      <HStack gap={[4, 4, 8]} w='full' fontWeight='600'>
        <Icon
          as={icon}
          fontSize='3rem'
          p={3}
          bgColor={color + '.400'}
          color={color + '.100'}
          borderRadius='6px'
        />
        <Text fontSize='1.5rem'>{stat}</Text>
      </HStack>
      <Text mt={4} color='gray.200' fontWeight='500' fontSize='0.95rem'>
        {name}
      </Text>
    </Box>
  );
};

export default BoxStats;
