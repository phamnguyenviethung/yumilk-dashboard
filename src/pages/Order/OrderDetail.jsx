import { useGetOrderDetailQuery } from '@/apis/orderApi';
import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id);
  if (isLoading) return <p>loading</p>;
  console.log(data);
  return <Container maxW='container.xl'>{id}</Container>;
};

export default OrderDetail;
