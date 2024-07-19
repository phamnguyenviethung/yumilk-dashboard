import { useGetCustomerTotalPurchaseQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import formatMoney from '@/utils/formatMoney';
import {
  Box,
  Center,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TopCustomer = () => {
  const { data, isLoading } = useGetCustomerTotalPurchaseQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );
  return (
    <Box w='full'>
      <Heading as='h4' fontSize='1.4rem' color='pink.400' my={4}>
        Khách hàng thân thiết
      </Heading>
      <TableContainer bgColor='brand.secondary'>
        <Table size={['sm', 'md', 'lg']}>
          <Thead>
            <Tr>
              <Th>Tên</Th>
              <Th>Đơn hàng</Th>
              <Th>Chi tiêu</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(c => {
              return (
                <Tr key={c.customerId}>
                  <Td>
                    <Text
                      as={Link}
                      to={`/manage/customer/${c.customerId}`}
                      fontWeight={700}
                    >
                      {c.customerName}
                    </Text>
                  </Td>
                  <Td>{c.totalPurchase}</Td>
                  <Td>{formatMoney(c.totalRevenue)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopCustomer;
