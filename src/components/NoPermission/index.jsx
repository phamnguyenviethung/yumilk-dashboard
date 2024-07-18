import { Center, Heading, Icon } from '@chakra-ui/react';
import { TbLock } from 'react-icons/tb';

const NoPermission = () => {
  return (
    <Center h='100%' flexDirection='column' pb='4rem'>
      <Icon as={TbLock} fontSize={['12rem', '14rem']} mb='1rem' />
      <Heading as='h6' fontSize={['1rem', '1.5rem', '2rem']}>
        Bạn không có quyền truy cập
      </Heading>
    </Center>
  );
};

export default NoPermission;
