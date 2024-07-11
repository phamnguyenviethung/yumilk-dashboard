import { useGetAllUnitQuery } from '@/apis/productApi';
import UnitModal from '@/features/Product/Unit/UnitModal';
import UnitTable from '@/features/Product/Unit/UnitTable';
import { Box, Flex } from '@chakra-ui/react';

const UnitList = () => {
  const { data, isLoading } = useGetAllUnitQuery({
    pageSize: 10000,
  });
  if (isLoading) return <p>loading.......</p>;

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
