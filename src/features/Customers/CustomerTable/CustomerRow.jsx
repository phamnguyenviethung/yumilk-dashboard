import { EditIcon } from '@chakra-ui/icons';
import { Icon, Td, Tr, useDisclosure } from '@chakra-ui/react';
import CustomerEditModal from './CustomerEditModal';

const CustomerRow = ({ data }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={data.phoneNumber}>
        <Td>{data.username}</Td>
        <Td>
          {data.firstName} {data.lastName}
        </Td>
        <Td>{data.email}</Td>
        <Td>{data.phoneNumber}</Td>
        <Td>{data.isActive ? 'Hoạt động' : 'Không hoạt động'}</Td>
        <Td>
          <Icon onClick={onOpen} as={EditIcon} />
          <CustomerEditModal data={data} isOpen={isOpen} onClose={onClose} />
        </Td>
      </Tr>
    </>
  );
};

export default CustomerRow;
