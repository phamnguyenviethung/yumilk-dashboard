import { Outlet } from 'react-router-dom';
import { Center, Image } from '@chakra-ui/react';
import logo from '@/assets/logo.png';
const SimpleLayout = () => {
  return (
    <>
      <Center h='100px'>
        <Center h='full'>
          <Image
            src={logo}
            boxSize={{
              base: '150px',
              lg: '200px',
            }}
          />
        </Center>
      </Center>
      <Outlet />
    </>
  );
};

export default SimpleLayout;
