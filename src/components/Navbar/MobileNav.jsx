import logo from '@/assets/logo.png';
import { logout } from '@/features/Auth/authSlice';
import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const nav = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    nav('/login');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg='brand.secondary'
      borderBottomWidth='1px'
      borderBottomColor='brand.secondary'
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Image
        display={{ base: 'flex', md: 'none' }}
        src={logo}
        boxSize='150px'
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <HStack gap='2'>
            <Avatar
              colorScheme='pink'
              size={'sm'}
              name={authState?.userData?.lastName}
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems='flex-start'
              spacing='1px'
              ml='2'
            >
              <Text fontSize='sm' fontWeight={700}>
                {authState?.userData?.firstName +
                  ' ' +
                  authState?.userData?.lastName}
              </Text>
              <Text
                fontSize='xs'
                fontWeight='600'
                color={
                  authState?.userData?.role === 'Admin'
                    ? 'pink.300'
                    : 'purple.400'
                }
              >
                {authState?.userData?.role}
              </Text>
            </VStack>
            <Icon
              ml={2}
              as={TbLogout}
              fontSize='1.2rem'
              color='red.400'
              cursor='pointer'
              onClick={handleLogout}
            />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
