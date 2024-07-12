import OrderCountLineChart from '@/features/Widget/OrderCountLineChart';
import RevenueMonthLineChart from '@/features/Widget/RevenueMonthLineChart';
import { Box, VStack } from '@chakra-ui/react';

const Stat = () => {
  return (
    <VStack w='full' gap='6'>
      <Box w='full'>
        <OrderCountLineChart />
      </Box>
      <Box w='full'>
        <RevenueMonthLineChart />
      </Box>
    </VStack>
  );
};

export default Stat;
