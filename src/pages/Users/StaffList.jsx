import { useGetAllUsersQuery } from '@/apis/userApi';
import AddNewButton from '@/features/Staff/AddNewButton';
import StaffTable from '@/features/Staff/StaffTable';
import Search from '@/features/Staff/StaffTable/Search';
import { Box, Container, Flex } from '@chakra-ui/react';
import queryString from 'query-string';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
const StaffList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllUsersQuery(
    queryString.stringify({
      role: '1,2',
      searchTerm,
    })
  );

  const debounced = useDebouncedCallback(value => {
    setSearchTerm(value);
  }, 300);

  const handleChange = e => {
    debounced(e.target.value);
  };

  return (
    <Container maxW='container.xl' h='full'>
      <Flex justifyContent='space-between' w='full' my={4} py={2}>
        <Box>sort</Box>
        <Flex justifyContent='flex-end' alignItems='center' px={4}>
          <Search handleSearch={handleChange} />
          <AddNewButton />
        </Flex>
      </Flex>
      <StaffTable data={data} isLoading={isLoading} />
    </Container>
  );
};

export default StaffList;
