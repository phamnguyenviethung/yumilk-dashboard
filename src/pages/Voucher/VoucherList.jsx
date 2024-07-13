import { useGetAllVouchersQuery } from '@/apis/voucherApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import VoucherModal from '@/features/Voucher/VoucherModal';
import VoucherTable from '@/features/Voucher/VoucherTable';
import { Center, Flex, VStack } from '@chakra-ui/react';

const VoucherList = () => {
  const { data, isLoading } = useGetAllVouchersQuery({
    pageSize: 999999,
    sortColumn: 'percent',
  });
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <VStack boxSize='full' gap='6' w='full'>
      <Flex justifyContent='flex-end' w='full'>
        <VoucherModal isAdd />
      </Flex>
      <VoucherTable data={data} />
    </VStack>
  );
};

export default VoucherList;
