import { useGetAllReportQuery } from '@/apis/reportApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import ReportTable from '@/features/Report/ReportTable';
import { Center, Text, VStack } from '@chakra-ui/react';

const ReportList = () => {
  const { data, isLoading, isError } = useGetAllReportQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  if (isError) {
    return (
      <Center boxSize='full'>
        <Text>Có lỗi xảy ra</Text>
      </Center>
    );
  }

  return (
    <VStack boxSize='full' gap='6' w='full'>
      <ReportTable data={data} />
    </VStack>
  );
};

export default ReportList;
