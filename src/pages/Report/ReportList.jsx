import { useGetAllReportQuery } from '@/apis/reportApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ReportTable from '@/features/Report/ReportTable';
import { Center, VStack } from '@chakra-ui/react';

const ReportList = () => {
  const { data, isLoading } = useGetAllReportQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  return (
    <VStack boxSize='full' gap='6' w='full'>
      <ReportTable data={data} />
    </VStack>
  );
};

export default ReportList;
