import { useGetAllCategoryQuery } from '@/apis/productApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import CategoryModal from '@/features/Product/Category/CategoryModal';
import CategoryTable from '@/features/Product/Category/CategoryTable';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

const CategoryList = () => {
  const { data, isLoading, isError } = useGetAllCategoryQuery({
    pageSize: 10000,
  });
  if (isLoading) {
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center boxSize='full'>
        <Text>Có lỗi xảy ra</Text>
      </Center>
    );
  }

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
