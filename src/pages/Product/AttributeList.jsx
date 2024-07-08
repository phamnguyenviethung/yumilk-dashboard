import { useGetAllAttributeQuery } from '@/apis/attributeApi';
import AttributeTable from '@/features/Product/Attribute/AttributeTable';

const AttributeList = () => {
  const { data, isLoading } = useGetAllAttributeQuery({
    pageSize: 10000,
  });
  if (isLoading) return <p>loading.......</p>;

  return (
    <>
      <AttributeTable data={data} />
    </>
  );
};

export default AttributeList;
