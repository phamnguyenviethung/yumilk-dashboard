import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Link as ChakraLink, Flex, Tag } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // ES 2015
import { useState } from 'react';
import { Link } from 'react-router-dom';
dayjs.locale('vi');
dayjs.extend(utc);
const Status = ({ data }) => {
  return (
    <Flex alignItems='center' boxSize='full'>
      <Tag colorScheme={order[data.value.toUpperCase()].color}>
        {data.value}
      </Tag>
    </Flex>
  );
};

const OrderTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
      headerName: 'ID',
      valueFormatter: p => '...' + p.value.slice(-5),
    },
    {
      field: 'createdDate',
      headerName: 'Ngày tạo',
      filter: true,
      valueFormatter: p => dayjs(p.value).format('HH:mm DD/MM/YYYY'),
    },
    {
      field: 'totalAmount',
      headerName: 'Tổng tiền',
      valueFormatter: p => formatMoney(p.value),
    },
    { field: 'paymentMethod', headerName: 'Thanh toán' },
    {
      field: 'orderStatus',
      headerName: 'Trạng thái',
      cellRenderer: p => <Status data={p} />,
    },
    {
      field: 'id',
      headerName: 'Chi tiết',
      cellRenderer: props => {
        return (
          <ChakraLink
            color='pink.400'
            as={Link}
            to={`/manage/order/${props.value}`}
          >
            Xem chi tiết
          </ChakraLink>
        );
      },
    },
  ]);
  return (
    <div className='ag-theme-quartz-auto-dark' style={{ height: 500 }}>
      <AgGridReact
        rowData={data.items}
        columnDefs={colDefs}
        pagination
        paginationAutoPageSize
      />
    </div>
  );
};

export default OrderTable;