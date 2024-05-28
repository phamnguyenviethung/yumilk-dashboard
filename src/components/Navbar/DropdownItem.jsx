import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import NavItem from './NavItem';

const DropdownItem = ({ data, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex
        onClick={onToggle}
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
          {data.icon && (
            <Icon
              mr='4'
              fontSize='16'
              _groupHover={{
                color: 'white',
              }}
              as={data.icon}
            />
          )}
          {data.name}
        </Box>
        <Icon
          fontSize='14'
          _groupHover={{
            color: 'white',
          }}
          as={isOpen ? ChevronDownIcon : ChevronRightIcon}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {data.subItems.map(item => {
          return (
            <NavItem
              key={item.name}
              icon={item.icon}
              path={item.path}
              fontSize='14'
              my={2}
              bg='gray.700'
              _hover={{
                bg: 'pink.400',
                color: 'white',
              }}
            >
              {item.name}
            </NavItem>
          );
        })}
      </Collapse>
    </>
  );
};

export default DropdownItem;
