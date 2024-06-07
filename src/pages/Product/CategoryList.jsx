import { useGetCategoryQuery } from '@/apis/productApi';
import CategoryTable from '@/features/Product/Category/CategoryTable';

const CategoryList = () => {
  const { data, isLoading } = useGetCategoryQuery();
  if (isLoading) return <p>loading.......</p>;

  return (
    <>
      <CategoryTable data={data} />
    </>
  );
};

export default CategoryList;
