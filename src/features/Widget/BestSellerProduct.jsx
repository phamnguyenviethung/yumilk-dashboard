import { useGetProductStatsQuery } from '@/apis/statApi';
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

const BestSellerProduct = () => {
  const { data, isLoading } = useGetProductStatsQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <Box w='full'>
      <Heading as='h4' fontSize='1.4rem' color='pink.400' my={4}>
        Sản phẩm bán chạy
      </Heading>
      <TableContainer bgColor='brand.secondary'>
        <Table size={['sm', 'md', 'lg']}>
          <Thead>
            <Tr>
              <Th>Tên</Th>
              <Th>Lượt mua</Th>
              <Th>Doanh thu</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.bestSellers.map(c => {
              return (
                <Tr key={c.id}>
                  <Td>
                    <Text
                      as={Link}
                      to={`/manage/product/${c.id}`}
                      fontWeight={700}
                    >
                      {c.name}
                    </Text>
                  </Td>
                  <Td>{c.totalSold}</Td>
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

export default BestSellerProduct;
