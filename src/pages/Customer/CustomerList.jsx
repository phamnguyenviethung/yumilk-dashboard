import { useGetAllCustomersQuery } from '@/apis/customerApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import CustomerTable from '@/features/Customer/CustomerTable';
import { Center, Text } from '@chakra-ui/react';

const CustomerList = () => {
  const { data, isLoading, isError } = useGetAllCustomersQuery({
    pageSize: 9999999,
    SortColumn: 'username',
  });
  if (isLoading) {
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
    <>
      <CustomerTable data={data} />
    </>
  );
};

export default CustomerList;
