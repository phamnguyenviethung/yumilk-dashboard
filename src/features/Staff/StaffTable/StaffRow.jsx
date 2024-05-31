import CONSTANTS from '@/constants';
import { Badge, Td, Tr } from '@chakra-ui/react';

const StaffRow = ({ data }) => {
  return (
    <>
      <Tr key={data.phoneNumber}>
        <Td>{data.username}</Td>
        <Td>
          {data.firstName} {data.lastName}
        </Td>
        <Td>
          <Badge
            ml='1'
            fontSize='0.8em'
            colorScheme={
              data.role.toLowerCase() === CONSTANTS.ROLE_ADMIN
                ? 'green'
                : 'pink'
            }
          >
            {data.role}
          </Badge>
        </Td>
        <Td>{data.isActive ? 'Hoạt động' : 'Không hoạt động'}</Td>
      </Tr>
    </>
  );
};

export default StaffRow;
