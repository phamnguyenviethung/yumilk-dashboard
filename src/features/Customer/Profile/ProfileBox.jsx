import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { MdOutlineAttachMoney } from 'react-icons/md';

const infoData = [
  {
    name: 'Username',
    field: 'username',
  },

  {
    name: 'First Name',
    field: 'firstName',
  },
  {
    name: 'Last Name',
    field: 'lastName',
  },
  {
    name: 'Email',
    field: 'email',
  },
  {
    name: 'Phone Number',
    field: 'phoneNumber',
  },
  {
    name: 'Status',
    field: 'isBanned',
    badge: {
      greenValue: true,
      badgeGreenText: 'Hoạt động',
      badgeRedText: 'Không hoạt động',
    },
  },
];

const CustomerInfo = ({ name, value, badge }) => {
  return (
    <Flex my={2} alignItems='center'>
      <Text fontWeight='bold' mr={1} color='gray.400'>
        {name}:
      </Text>
      {badge ? (
        <Badge colorScheme={value === badge.greenValue ? 'green' : 'red'}>
          {value === badge.greenValue
            ? badge.badgeGreenText
            : badge.badgeRedText}
        </Badge>
      ) : (
        <Text color='gray.300' fontWeight='600'>
          {value}
        </Text>
      )}
    </Flex>
  );
};

const CustomerStat = ({ number, name, icon }) => {
  return (
    <Flex alignItems='center' mx={2}>
      <Icon
        as={icon}
        color='pink.400'
        fontSize='2.6rem'
        bgColor='gray.600'
        px={2}
        borderRadius='6px'
      />
      <Flex ml={2} direction='column' justifyContent='space-between'>
        <Text fontWeight='bold' fontSize='18px'>
          {number}
        </Text>
        <Text fontWeight='600' color='gray.400' fontSize='14px'>
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

const ProfileBox = ({ data }) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      w='full'
      justifyContent='space-around'
    >
      <Avatar name={data.lastName} size='xl' />
      <Text fontSize='14px' fontWeight='600' color='gray.400' my={4}>
        Customer ID: {data.userID}
      </Text>
      <Flex justifyContent='space-between' w='50%'>
        <CustomerStat icon={MdOutlineShoppingCart} name='Orders' number='100' />
        <CustomerStat icon={MdOutlineAttachMoney} name='Spent' number='100' />
      </Flex>
      <Box w='full' mt={2}>
        <Text fontSize='22px' fontWeight='bold'>
          Thông tin
        </Text>
      </Box>
      <Divider mb={2} mt={1} />
      <Box w='full'>
        {infoData.map(info => {
          return (
            <CustomerInfo
              key={info.field}
              name={info.name}
              value={data[info.field]}
              badge={info.badge}
            />
          );
        })}
      </Box>
    </Flex>
  );
};

export default ProfileBox;
