import { EditIcon } from '@chakra-ui/icons';
import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import CustomerEditModal from './CustomerEditModal';

const CustomerTable = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              return (
                <Tr key={item.phoneNumber}>
                  <Td>{item.username}</Td>
                  <Td>
                    {item.firstName} {item.lastName}
                  </Td>
                  <Td>{item.email}</Td>
                  <Td>{item.phoneNumber}</Td>
                  <Td>{item.isActive ? 'Hoạt động' : 'Không hoạt động'}</Td>
                  <Td>
                    <Icon onClick={onOpen} as={EditIcon} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomerEditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CustomerTable;
