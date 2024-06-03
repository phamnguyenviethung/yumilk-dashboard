import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import StaffRow from './StaffRow';
import CircleLoading from '@/components/Loading/CircleLoading';

const StaffTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Center h='full'>
        <CircleLoading />
      </Center>
    );
  }

  if (data.items.length === 0) {
    return (
      <Center>
        <Text fontSize='1.4rem' fontWeight='bold'>
          Không có dữ liệu
        </Text>
      </Center>
    );
  }

  return (
    <>
      <TableContainer border='1'>
        <Table size='lg'>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Full Name</Th>
              <Th>Role</Th>
              <Th>Trạng thái</Th>
              <Th>Hoạt động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.items.map(item => {
              return <StaffRow key={item.id} data={item} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaffTable;
