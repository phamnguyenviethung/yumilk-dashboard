import { useGetProductListQuery } from '@/apis/productApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import AddProductButton from '@/features/Product/AddProduct/AddProductButton';
import ProductTable from '@/features/Product/ProductTable';
import { Center, Flex, Text } from '@chakra-ui/react';

const ProductList = () => {
  const { data, isLoading, isError } = useGetProductListQuery({
    pageSize: 9999999,
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
    <>
      <Flex my={4} justifyContent='flex-end'>
        <AddProductButton />
      </Flex>
      {/* <HStack gap='2' my='2'>
        <Switch
          colorScheme='pink'
          isChecked={isPreorder}
          onChange={() => setIsPreorder(prev => !prev)}
        />
        <Text>Sản phẩm đặt trước</Text>
      </HStack> */}
      <ProductTable data={data} />
    </>
  );
};

export default ProductList;
