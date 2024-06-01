import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import StaffRow from './StaffRow';

const StaffTable = ({ data }) => {
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
