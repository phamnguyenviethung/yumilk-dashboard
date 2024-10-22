import { Box, CloseButton, Flex, Image } from '@chakra-ui/react';

import logo from '@/assets/logo.png';
import { matchRoutes } from 'react-router-dom';
import DropdownItem from '../Navbar/DropdownItem';
import NavItem from '../Navbar/NavItem';
import data from './data';
import { useSelector } from 'react-redux';
const SidebarContent = ({ onClose, ...rest }) => {
  const authState = useSelector(state => state.auth);
  return (
    <Box
      bg={'brand.secondary'}
      borderRight='1px'
      borderRightColor='brand.secondary'
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      overflowY='auto'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src={logo} boxSize='150px' />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {data.map(link => {
        if (link.forAdmin && authState?.userData?.role !== 'Admin') {
          return <></>;
        }

        if (link.subItems) {
          return <DropdownItem key={link.name} data={link} />;
        } else {
          return (
            <NavItem
              key={link.name}
              icon={link.icon}
              path={link.path}
              bg={
                matchRoutes(
                  [
                    {
                      path: link.path,
                    },
                  ],
                  location
                )
                  ? 'pink.500'
                  : 'inherit'
              }
            >
              {link.name}
            </NavItem>
          );
        }
      })}
    </Box>
  );
};

export default SidebarContent;
