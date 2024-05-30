import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import CustomerRow from './CustomerRow';

const CustomerTable = ({ data }) => {
  return (
    <>
      <TableContainer border='1'>
        <Table size='lg'>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Trạng thái</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.items.map(item => {
              return <CustomerRow key={item.userID} data={item} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerTable;
