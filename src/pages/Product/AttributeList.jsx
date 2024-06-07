import { useGetAllAttributeQuery } from '@/apis/attributeApi';
import AttributeTable from '@/features/Product/Attribute/AttributeTable';

const AttributeList = () => {
  const { data, isLoading } = useGetAllAttributeQuery();
  if (isLoading) return <p>loading.......</p>;

  return (
    <>
      <AttributeTable data={data} />
    </>
  );
};

export default AttributeList;
