import { useGetOrderListQuery } from '@/apis/orderApi';
import OrderTable from '@/features/Order/OrderTable';

const OrderList = () => {
  const { data, isLoading } = useGetOrderListQuery();
  if (isLoading) return <p>loading..</p>;
  return <OrderTable data={data} />;
};

export default OrderList;
