import EditProduct from '@/features/Product/EditProduct';
import { useParams } from 'react-router-dom';

const ProductDetailsEdit = () => {
  const { id } = useParams();
  if (!id) {
    return <p>Ko co id</p>;
  }

  return (
    <>
      <EditProduct id={id} />
    </>
  );
};

export default ProductDetailsEdit;
