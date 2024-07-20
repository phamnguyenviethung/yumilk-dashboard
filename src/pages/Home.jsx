import { useGetOrderListQuery } from '@/apis/orderApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import BestSellerProduct from '@/features/Widget/BestSellerProduct';
import HomePageBoxStats from '@/features/Widget/HomePageBoxStats';
import PaymentPieChart from '@/features/Widget/PaymentPieChart';
import QuarterChart from '@/features/Widget/QuarterChart';
import RecentOrder from '@/features/Widget/RecentOrder';
import RecentReview from '@/features/Widget/RecentReview';
import RevenueMonthLineChart from '@/features/Widget/RevenueMonthLineChart';
import TopCustomer from '@/features/Widget/TopCustomer';
import WeeklyChart from '@/features/Widget/WeeklyChart';
import { Box, Center, Heading, Stack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ForAdmin = ({ children }) => {
  const authState = useSelector(state => state.auth);

  if (authState?.userData?.role !== 'Admin') return <></>;

  return children;
};

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
      <ForAdmin>
        <Box w='full'>
          <WeeklyChart />
        </Box>
      </ForAdmin>

      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        w='full'
        my={4}
      >
        <TopCustomer />
        <BestSellerProduct />
      </Stack>
      <ForAdmin>
        <Box w='full'>
          <RevenueMonthLineChart />
        </Box>
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
            <QuarterChart />
          </Box>
        </Stack>
      </ForAdmin>
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
