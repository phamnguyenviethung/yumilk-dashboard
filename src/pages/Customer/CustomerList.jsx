import { useGetAllCustomersQuery } from '@/apis/customerApi';
import CustomerTable from '@/features/Customer/CustomerTable';

const CustomerList = () => {
  const { data, isLoading } = useGetAllCustomersQuery({
    pageSize: 9999999,
    RoleIds: '1,2',
    SortColumn: 'createdAt',
  });
  if (isLoading) return <p>loading...........</p>;
  return (
    <>
      <CustomerTable data={data} />
    </>
  );
};

export default CustomerList;
