import { useGetAllUnitQuery } from '@/apis/productApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import UnitModal from '@/features/Product/Unit/UnitModal';
import UnitTable from '@/features/Product/Unit/UnitTable';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

const UnitList = () => {
  const { data, isLoading, isError } = useGetAllUnitQuery({
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
        <UnitModal isAdd />
      </Flex>
      <UnitTable data={data} />
    </Box>
  );
};

export default UnitList;
