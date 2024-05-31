import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarContent from '../Sidebar';
import MobileNav from '../Navbar/MobileNav';

export default function MainLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4' h='calc(100vh - 20px)'>
        <Outlet />
      </Box>
    </Box>
  );
}
