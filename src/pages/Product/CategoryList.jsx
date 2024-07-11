import { useGetAllCategoryQuery } from '@/apis/productApi';
import CategoryModal from '@/features/Product/Category/CategoryModal';
import CategoryTable from '@/features/Product/Category/CategoryTable';
import { Box, Flex } from '@chakra-ui/react';

const CategoryList = () => {
  const { data, isLoading } = useGetAllCategoryQuery({
    pageSize: 10000,
  });
  if (isLoading) return <p>loading.......</p>;

  return (
    <Box boxSize='full'>
      <Flex justifyContent='flex-end'>
        <CategoryModal isAdd />
      </Flex>
      <CategoryTable data={data} />
    </Box>
  );
};

export default CategoryList;
