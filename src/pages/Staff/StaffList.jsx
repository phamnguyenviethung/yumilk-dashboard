import { useGetAllUsersQuery } from '@/apis/userApi';
import AddNewButton from '@/features/Staff/AddNewButton';
import StaffTable from '@/features/Staff/StaffTable';
import { Flex } from '@chakra-ui/react';

const StaffList = () => {
  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: 9999999,
    RoleIds: '1,2',
    SortColumn: 'createdAt',
  });
  if (isLoading) return <p>loading...........</p>;
  return (
    <>
      <Flex my={4} justifyContent='flex-end'>
        <AddNewButton />
      </Flex>
      <StaffTable data={data} />
    </>
  );
};

export default StaffList;
