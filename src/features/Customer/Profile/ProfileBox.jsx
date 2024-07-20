import { useUpdateUserMutation } from '@/apis/userApi';
import formatMoney from '@/utils/formatMoney';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdOutlineAttachMoney, MdOutlineShoppingCart } from 'react-icons/md';

const infoData = [
  {
    name: 'Tên người dùng',
    field: 'username',
  },

  {
    name: 'Họ',
    field: 'firstName',
  },
  {
    name: 'Tên',
    field: 'lastName',
  },
  {
    name: 'Email',
    field: 'email',
  },
  {
    name: 'Số điện thoại',
    field: 'phoneNumber',
  },
  {
    name: 'Trạng thái',
    field: 'isBanned',
    badge: {
      greenValue: false,
      badgeGreenText: 'Hoạt động',
      badgeRedText: 'Không hoạt động',
    },
  },
];

const CustomerInfo = ({ name, value, badge }) => {
  return (
    <Flex my={2} alignItems='center' justifyContent='space-between' w='full'>
      <Text fontWeight='bold' mr={1} color='gray.400' fontSize='1rem'>
        {name}:
      </Text>
      {badge ? (
        <Tag
          size='md'
          variant='solid'
          colorScheme={value === badge.greenValue ? 'green' : 'red'}
        >
          {value === badge.greenValue
            ? badge.badgeGreenText
            : badge.badgeRedText}
        </Tag>
      ) : (
        <Text color='gray.300' fontWeight='600' fontSize='1.2rem'>
          {value}
        </Text>
      )}
    </Flex>
  );
};

const CustomerStat = ({ number, name, icon, bgColor }) => {
  return (
    <Flex gap='2' alignItems='center' mx={2}>
      <Icon
        as={icon}
        color='white'
        fontSize={{
          base: '2.6rem',
          lg: '3rem',
        }}
        bgColor={bgColor}
        px={2}
        borderRadius='6px'
      />
      <Flex direction='column' justifyContent='space-between'>
        <Text
          fontWeight='bold'
          fontSize={{
            base: '0.8rem',
            lg: '1rem',
          }}
        >
          {number}
        </Text>
        <Text
          fontWeight='600'
          color='gray.400'
          fontSize={{
            base: '0.75rem',
            lg: '0.9remrem',
          }}
        >
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

const ProfileBox = ({ data, statData }) => {
  const [updateUserAPI, { isLoading }] = useUpdateUserMutation();

  const handleBanUser = async () => {
    try {
      const res = await updateUserAPI({
        id: data.userID,
        data: {
          isBanned: !data.isBanned,
        },
      });

      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction='column'
      alignItems='center'
      w='full'
      justifyContent='space-around'
    >
      <Avatar name={data.lastName} size='xl' />
      <Text fontSize='14px' fontWeight='600' color='gray.400' my={4}>
        ID: {data.userID}
      </Text>
      <Flex justifyContent='space-between'>
        <CustomerStat
          icon={MdOutlineShoppingCart}
          name='Đơn hàng'
          number={statData?.totalPurchase ?? 0}
          bgColor='pink.400'
        />
        <CustomerStat
          icon={MdOutlineAttachMoney}
          name='Chi tiêu'
          number={formatMoney(statData?.totalRevenue ?? 0)}
          bgColor='green.400'
        />
      </Flex>
      <Box w='full' mt={2}>
        <Text fontSize='22px' fontWeight='bold'>
          Thông tin
        </Text>
      </Box>
      <Divider mb={2} mt={1} />
      <VStack w='full' spacing='2'>
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
        <Button
          mt={4}
          w='full'
          colorScheme={data?.isBanned ? 'green' : 'red'}
          isLoading={isLoading}
          onClick={handleBanUser}
        >
          {data?.isBanned ? 'Mở' : 'Khoá'} tài khoản
        </Button>
      </VStack>
    </Flex>
  );
};

export default ProfileBox;
