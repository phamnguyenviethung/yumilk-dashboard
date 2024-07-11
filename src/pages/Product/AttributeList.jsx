import { useGetAllAttributeQuery } from '@/apis/attributeApi';
import AttributeModal from '@/features/Product/Attribute/AttributeModal';
import AttributeTable from '@/features/Product/Attribute/AttributeTable';
import { Box, Flex } from '@chakra-ui/react';

const AttributeList = () => {
  const { data, isLoading } = useGetAllAttributeQuery({
    pageSize: 10000,
  });
  if (isLoading) return <p>loading.......</p>;

  return (
    <Box boxSize='full'>
      <Flex justifyContent='flex-end'>
        <AttributeModal isAdd />
      </Flex>
      <AttributeTable data={data} />
    </Box>
  );
};

export default AttributeList;
