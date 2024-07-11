import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import NavItem from './NavItem';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useState } from 'react';

const DropdownItem = ({ data, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  const [isMatch, setIsMatch] = useState(matchRoutes(data.subItems, location));
  return (
    <>
      <Flex
        onClick={() => {
          onToggle();
          setIsMatch(false);
        }}
        align='center'
        py='4'
        px='2'
        mx='4'
        my={2}
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
              fontSize='1.6rem'
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
          as={isOpen || isMatch ? ChevronDownIcon : ChevronRightIcon}
        />
      </Flex>
      <Collapse in={isOpen || isMatch} animateOpacity>
        {data.subItems.map(item => {
          return (
            <NavItem
              key={item.name}
              icon={item.icon}
              path={item.path}
              fontSize='14'
              my={2}
              bg={
                matchRoutes(
                  [
                    {
                      path: item.path,
                    },
                  ],
                  location
                )
                  ? 'pink.500'
                  : 'whiteAlpha.100'
              }
              _hover={{
                bg: 'pink.600',
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
