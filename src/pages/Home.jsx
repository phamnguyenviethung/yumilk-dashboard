import { useGetOrderListQuery } from '@/apis/orderApi';
import HomePageBoxStats from '@/features/Widget/HomePageBoxStats';
import PaymentPieChart from '@/features/Widget/PaymentPieChart';
import RecentOrder from '@/features/Widget/RecentOrder';
import { Box, Heading, Stack, VStack } from '@chakra-ui/react';
const Home = () => {
  const { data, isLoading } = useGetOrderListQuery({
    pageSize: 5,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
  });
  if (isLoading) return <p>loading..</p>;
  return (
    <VStack w='full' gap='4'>
      <HomePageBoxStats />
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        w='full'
      >
        <Box flex='1'>
          <PaymentPieChart />
        </Box>
        <Box flex='4'>s</Box>
      </Stack>
      <Box h='300px' w='full'>
        <Heading as='h4' fontSize='1.4rem' color='pink.400' my={4}>
          Đơn hàng gần đây
        </Heading>
        <RecentOrder data={data} />
      </Box>
    </VStack>
  );
};

export default Home;
