import EditProduct from '@/features/Product/EditProduct';
import { useParams } from 'react-router-dom';

const ProductDetailsEdit = () => {
  const { id } = useParams();

  return (
    <>
      <EditProduct id={id} />
    </>
  );
};

export default ProductDetailsEdit;
