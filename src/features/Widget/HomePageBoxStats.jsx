import { useGetOrderStatsQuery } from '@/apis/statApi';
import BoxStats from '@/components/Stats/BoxStat';
import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { TbPackage, TbReportMoney, TbShoppingBagEdit } from 'react-icons/tb';
const HomePageBoxStats = () => {
  const { data } = useGetOrderStatsQuery({
    params: {
      FromOrderDate: '2000-01-01',
    },
  });
  const { data: todayStats } = useGetOrderStatsQuery({
    params: {
      FromOrderDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    },
  });

  return (
    <Stack
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      gap='2'
      w='full'
    >
      <BoxStats
        name='Doanh thu trong 24h qua'
        stat={formatMoney(todayStats?.totalRevenue)}
        color='green'
        icon={TbReportMoney}
      />
      <BoxStats
        name='Đơn hàng mới trong 24h qua'
        stat={todayStats?.totalOrders}
        color='purple'
        icon={TbShoppingBagEdit}
      />
      <BoxStats
        name='Chờ xác nhận'
        stat={
          data?.totalOrdersPerStatus.find(
            item =>
              item.status.toUpperCase() === order.PENDING.name.toUpperCase()
          )?.count
        }
        color='teal'
        icon={TbShoppingBagEdit}
      />
      <BoxStats
        name='Đang xử lý'
        stat={
          data?.totalOrdersPerStatus.find(
            item =>
              item.status.toUpperCase() === order.PROCESSING.name.toUpperCase()
          )?.count
        }
        color='pink'
        icon={TbPackage}
      />
    </Stack>
  );
};

export default HomePageBoxStats;
