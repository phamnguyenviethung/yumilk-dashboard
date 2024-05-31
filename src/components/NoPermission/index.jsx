import { Center, Heading, Icon } from '@chakra-ui/react';
import { BiLockAlt } from 'react-icons/bi';

const NoPermission = () => {
  return (
    <Center h='100%' flexDirection='column' pb='4rem'>
      <Icon as={BiLockAlt} fontSize={['20rem', '24rem']} mb='1rem' />
      <Heading as='h6' fontSize={['1rem', '1.5rem', '2.5rem']}>
        Bạn không có quyền truy cập
      </Heading>
    </Center>
  );
};

export default NoPermission;
