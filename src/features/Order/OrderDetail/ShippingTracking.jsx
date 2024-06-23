import { useGetShippingDetailQuery } from '@/apis/orderApi';

const ShippingTracking = ({ id }) => {
  const { data, isLoading } = useGetShippingDetailQuery(id);
  if (isLoading) return <p>ss</p>;
  return <div>ShippingTracking</div>;
};

export default ShippingTracking;
