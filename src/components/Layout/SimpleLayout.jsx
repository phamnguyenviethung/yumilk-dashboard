import { Outlet } from 'react-router-dom';
import { Center } from '@chakra-ui/react';

const SimpleLayout = () => {
  return (
    <>
      <Center h='100px'>
        <Center h='full'>Logo</Center>
      </Center>
      <Outlet />
    </>
  );
};

export default SimpleLayout;
