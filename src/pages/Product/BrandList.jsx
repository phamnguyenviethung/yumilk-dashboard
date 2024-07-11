import { useGetAllBrandQuery } from '@/apis/brandApi';
import BrandModal from '@/features/Product/Brand/BrandModal';
import BrandTable from '@/features/Product/Brand/BrandTable';
import { Box, Flex } from '@chakra-ui/react';

const BrandList = () => {
  const { data, isLoading } = useGetAllBrandQuery({
    pageSize: 10000,
  });
  if (isLoading) return <p>loading.......</p>;

  return (
    <Box boxSize='full'>
      <Flex justifyContent='flex-end'>
        <BrandModal isAdd />
      </Flex>
      <BrandTable data={data} />
    </Box>
  );
};

export default BrandList;
