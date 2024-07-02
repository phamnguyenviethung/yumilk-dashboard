import { Box, Flex, Icon, Link } from '@chakra-ui/react';
const NavItem = ({ path, icon, children, ...rest }) => {
  return (
    <Link
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        py='4'
        px='2'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        justify='space-between'
        _hover={{
          bg: 'pink.400',
          color: 'white',
        }}
        {...rest}
      >
        <Box>
          {icon && (
            <Icon
              mr='4'
              fontSize='16'
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Box>
      </Flex>
    </Link>
  );
};
export default NavItem;
