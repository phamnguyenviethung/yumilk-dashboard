import { useGetProductByIDQuery } from '@/apis/productApi';
import { useGetAllReviewsQuery } from '@/apis/reviewApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import EditProduct from '@/features/Product/EditProduct';
import ProductStats from '@/features/Product/EditProduct/ProductStats';
import ReviewTable from '@/features/Review/ReviewTable';
import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ProductDetailsEdit = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIDQuery(id);
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useGetAllReviewsQuery({
    ProductId: id,
  });

  if (!id || isError || reviewError) {
    return (
      <Center boxSize='full'>
        <Text>Không có dữ liệu</Text>
      </Center>
    );
  }

  if (isLoading || reviewLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <VStack gap='6' w='full' pt={4} pb={16}>
      <ProductStats data={data} />
      <EditProduct data={data} />
      <Box h='700px' w='full'>
        <Heading as='h6' mb={4} fontSize='1.5rem' color='pink.400'>
          Đánh giá của sản phẩm
        </Heading>
        <ReviewTable data={reviewData} />
      </Box>
    </VStack>
  );
};

export default ProductDetailsEdit;
