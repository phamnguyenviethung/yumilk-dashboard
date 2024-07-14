import { useGetAllReviewsQuery } from '@/apis/reviewApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ReviewTable from '@/features/Review/ReviewTable';
import { Center, VStack } from '@chakra-ui/react';

const ReviewList = () => {
  const { data, isLoading } = useGetAllReviewsQuery({
    pageSize: 999999,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
  });
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <VStack boxSize='full' gap='6' w='full'>
      <ReviewTable data={data} />
    </VStack>
  );
};

export default ReviewList;
