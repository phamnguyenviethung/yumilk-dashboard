import { useGetOrderListQuery } from '@/apis/orderApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import HomePageBoxStats from '@/features/Widget/HomePageBoxStats';
import PaymentPieChart from '@/features/Widget/PaymentPieChart';
import RecentOrder from '@/features/Widget/RecentOrder';
import RecentReview from '@/features/Widget/RecentReview';
import RevenueMonthLineChart from '@/features/Widget/RevenueMonthLineChart';
import WeeklyChart from '@/features/Widget/WeeklyChart';
import { Box, Center, Heading, Stack, VStack } from '@chakra-ui/react';
const Home = () => {
  const { data, isLoading } = useGetOrderListQuery({
    pageSize: 10,
  });
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );
  return (
    <VStack w='full' gap='4'>
      <HomePageBoxStats />
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        w='full'
        gap='4'
      >
        <Box flex='1'>
          <PaymentPieChart />
        </Box>
        <Box flex='4'>
          <WeeklyChart />
        </Box>
      </Stack>
      <Box w='full'>
        <RevenueMonthLineChart />
      </Box>
      <Box h='700px' w='full' my={6}>
        <Heading as='h4' fontSize='1.4rem' color='pink.400' my={4}>
          Đơn hàng gần đây
        </Heading>
        <RecentOrder data={data} />
      </Box>
      <Box h='400px' w='full' my={6}>
        <Heading as='h4' fontSize='1.4rem' color='pink.400' my={4}>
          Đánh giá gần đây
        </Heading>
        <RecentReview />
      </Box>
    </VStack>
  );
};

export default Home;
