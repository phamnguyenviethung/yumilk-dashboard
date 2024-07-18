import { useGetAllUsersQuery } from '@/apis/userApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import AddNewButton from '@/features/Staff/AddNewButton';
import StaffTable from '@/features/Staff/StaffTable';
import { Center, Flex, Text } from '@chakra-ui/react';

const StaffList = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery({
    pageSize: 9999999,
    RoleIds: '1,2',
    SortColumn: 'createdAt',
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
      <Flex my={4} justifyContent='flex-end'>
        <AddNewButton />
      </Flex>
      <StaffTable data={data} />
    </>
  );
};

export default StaffList;
