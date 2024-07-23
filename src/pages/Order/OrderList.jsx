import { useGetOrderListQuery } from '@/apis/orderApi';
import { useGetOrderStatsQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import BoxStats from '@/components/Stats/BoxStat';
import OrderTable from '@/features/Order/OrderTable';
import {
  Box,
  Center,
  HStack,
  Stack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  TbPackage,
  TbShoppingBagEdit,
  TbShoppingBagX,
  TbTruckDelivery,
  TbShoppingBagCheck,
} from 'react-icons/tb';

const statList = [
  {
    name: 'Đang chờ xác nhận',
    color: 'teal',
    statName: 'PENDING',
    icon: TbShoppingBagEdit,
  },
  {
    name: 'Đang xử lý',
    color: 'purple',
    statName: 'PROCESSING',
    icon: TbPackage,
  },
  {
    name: 'Đang giao',
    color: 'pink',
    statName: 'SHIPPED',
    icon: TbTruckDelivery,
  },
  {
    name: 'Thành công',
    color: 'green',
    statName: 'DELIVERED',
    icon: TbShoppingBagCheck,
  },
  {
    name: 'Đã huỷ',
    color: 'red',
    statName: 'CANCELLED',
    icon: TbShoppingBagX,
  },
];

const OrderList = () => {
  const [isPreorder, setIsPreorder] = useState(false);
  const { data: stats, isLoading: statsLoading } = useGetOrderStatsQuery({
    params: {
      FromOrderDate: '2000-01-01',
    },
  });
  const { data, isLoading, isError } = useGetOrderListQuery({
    pageSize: 999999,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
    isPreorder,
  });
  if (isLoading || statsLoading) {
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center boxSize='full'>
        <Text>Có lỗi xảy ra</Text>
      </Center>
    );
  }
  return (
    <VStack boxSize='full' gap='6'>
      <Stack
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        w='full'
        gap='2'
      >
        {statList.map(s => {
          return (
            <BoxStats
              key={s.name}
              name={s.name}
              color={s.color}
              stat={
                stats.totalOrdersPerStatus.find(
                  item => item.status.toUpperCase() === s.statName.toUpperCase()
                )?.count
              }
              icon={s.icon}
            />
          );
        })}
      </Stack>
      <Box flex='1' w='full'>
        <HStack gap='2' my='2'>
          <Switch
            colorScheme='pink'
            isChecked={isPreorder}
            onChange={() => setIsPreorder(prev => !prev)}
          />
          <Text>Đơn hàng đặt trước</Text>
        </HStack>
        <OrderTable data={data} />
      </Box>
    </VStack>
  );
};

export default OrderList;
