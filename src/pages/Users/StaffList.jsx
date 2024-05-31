import { useGetAllUsersQuery } from '@/apis/userApi';
import AddNewButton from '@/features/Staff/AddNewButton';
import StaffTable from '@/features/Staff/StaffTable';
import { Box, Container, Flex } from '@chakra-ui/react';
import queryString from 'query-string';
const StaffList = () => {
  // const { data, isLoading } = useGetAllCustomersQuery();
  const { data, isLoading } = useGetAllUsersQuery(
    queryString.stringify({
      role: '1,2',
    })
  );
  if (isLoading) {
    return <Box>Loading.............</Box>;
  }

  return (
    <Container maxW='container.xl' h='full'>
      <Flex justifyContent='flex-end' w='full'>
        <AddNewButton />
      </Flex>
      <StaffTable data={data} />
    </Container>
  );
};

export default StaffList;
