import { useGetProductListQuery } from '@/apis/productApi';
import AddProductButton from '@/features/Product/AddProduct/AddProductButton';
import ProductTable from '@/features/Product/ProductTable';
import { Flex } from '@chakra-ui/react';

const ProductList = () => {
  const { data, isLoading } = useGetProductListQuery({
    pageSize: 9999999,
  });
  if (isLoading) return <p>loading...........</p>;
  return (
    <>
      <Flex my={4} justifyContent='flex-end'>
        <AddProductButton />
      </Flex>
      <ProductTable data={data} />
    </>
  );
};

export default ProductList;
