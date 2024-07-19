import { useGetProductByIDQuery } from '@/apis/productApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import EditProduct from '@/features/Product/EditProduct';
import ProductStats from '@/features/Product/EditProduct/ProductStats';
import { Center, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ProductDetailsEdit = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIDQuery(id);

  if (!id || isError) {
    return (
      <Center boxSize='full'>
        <Text>Không có dữ liệu</Text>
      </Center>
    );
  }

  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <VStack gap='6' w='full' pt={4} pb={16}>
      <ProductStats data={data} />
      <EditProduct data={data} />
    </VStack>
  );
};

export default ProductDetailsEdit;
