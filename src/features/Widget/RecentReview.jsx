import { useGetAllReviewsQuery } from '@/apis/reviewApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ReviewTable from '@/features/Review/ReviewTable';
import { Center } from '@chakra-ui/react';

const RecentReview = props => {
  const { data, isLoading } = useGetAllReviewsQuery({
    pageSize: 5,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
  });
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return <ReviewTable data={data} {...props} pagination/>;
};

export default RecentReview;
