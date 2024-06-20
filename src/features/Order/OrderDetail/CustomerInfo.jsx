import { Box, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react';
const DetailsText = ({ data, isTag, tagColor, color }) => {
  return (
    <HStack
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
        <Tag size='md' colorScheme={tagColor}>
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

const CustomerInfo = ({ data }) => {
  const customerInfo = [
    {
      name: 'Người nhận',
      value: data.recieverName,
    },
    {
      name: 'Số điện thoại',
      value: data.phoneNumber,
    },
    {
      name: 'Địa chỉ',
      value: data.address,
    },
  ];
  return (
    <Box p='4' borderRadius='16px' boxSize='full' bgColor='brand.secondary'>
      <Heading as='h6' fontSize='1.2rem' fontWeight='600' mb='4'>
        Thông tin khách hàng
      </Heading>
      <VStack gap='4' w='full' flex='1'>
        {customerInfo.map(d => {
          return <DetailsText key={d.name} data={d} {...d} />;
        })}
      </VStack>
    </Box>
  );
};

export default CustomerInfo;
