import { useGetAllCustomersQuery } from '@/apis/customer';
import CustomerTable from '@/features/Customers/CustomerTable';
import { Box, Container } from '@chakra-ui/react';

const CustomerList = () => {
  const { data, isLoading } = useGetAllCustomersQuery();
  if (isLoading) {
    return <Box>Loading.............</Box>;
  }

  return (
    <Container maxW='container.xl' h='full'>
      <CustomerTable data={data} />
    </Container>
  );
};

export default CustomerList;
