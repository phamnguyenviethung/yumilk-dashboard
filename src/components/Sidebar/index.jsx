import { Box, CloseButton, Flex, Text } from '@chakra-ui/react';

import NavItem from '../Navbar/NavItem';
import data from './data';
import DropdownItem from '../Navbar/DropdownItem';

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={'brand.secondary'}
      borderRight='1px'
      borderRightColor='gray.600'
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {data.map(link => {
        if (link.subItems) {
          return <DropdownItem key={link.name} data={link} />;
        } else {
          return (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          );
        }
      })}
    </Box>
  );
};

export default SidebarContent;
