import { useGetOrderListQuery } from '@/apis/orderApi';
import { useGetOrderStatsQuery } from '@/apis/statApi';
import BoxStats from '@/components/Stats/BoxStat';
import OrderTable from '@/features/Order/OrderTable';
import { Box, Stack, VStack } from '@chakra-ui/react';
import {
  TbShoppingBagEdit,
  TbShoppingBagX,
  TbTruckDelivery,
  TbPackage,
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
    statName: 'SHIPPING',
    icon: TbTruckDelivery,
  },
  {
    name: 'Thành công',
    color: 'green',
    statName: 'DELIVERED',
    icon: TbShoppingBagX,
  },
  {
    name: 'Đã huỷ',
    color: 'red',
    statName: 'CANCELLED',
    icon: TbShoppingBagX,
  },
];

const OrderList = () => {
  const { data: stats, isLoading: statsLoading } = useGetOrderStatsQuery({
    params: {},
  });
  const { data, isLoading } = useGetOrderListQuery({
    pageSize: 100,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
  });
  if (isLoading || statsLoading) return <p>loading..</p>;

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
              stat={stats.totalOrdersPerStatus[s.statName]}
              icon={s.icon}
            />
          );
        })}
      </Stack>
      <Box flex='1' w='full'>
        <OrderTable data={data} />
      </Box>
    </VStack>
  );
};

export default OrderList;
