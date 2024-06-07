import { useGetProductListQuery } from '@/apis/productApi';
import ProductTable from '@/features/Product/ProductTable';

const ProductList = () => {
  const { data, isLoading } = useGetProductListQuery();
  if (isLoading) return <p>loading...........</p>;
  return <ProductTable data={data} />;
};

export default ProductList;
