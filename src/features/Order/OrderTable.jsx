import order from '@/constants/order';
import formatMoney from '@/utils/formatMoney';
import { Box, Link as ChakraLink, Flex, Tag, Text } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
// import 'ag-grid-community/styles/ag-theme-quartz.css';
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
        {order[data.value.toUpperCase()].text}
      </Tag>
    </Flex>
  );
};

const OrderTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
      filter: true,
      headerName: 'ID',
      valueFormatter: p => '...' + p.value.slice(-5),
    },
    {
      field: 'createdDate',
      headerName: 'Ngày tạo',
      filter: 'agDateColumnFilter',
      valueFormatter: p =>
        dayjs(p.value)
          .add(dayjs().utcOffset(), 'minutes')
          .format('HH:mm DD/MM/YYYY'),
    },
    {
      field: 'totalAmount',
      headerName: 'Tổng tiền',
      cellRenderer: p => (
        <Text
          fontWeight={600}
          color={
            p.value < 500000
              ? 'blue.400'
              : p.value > 1500000
              ? 'red.400'
              : 'pink.300'
          }
        >
          {formatMoney(p.value)}
        </Text>
      ),
    },
    {
      field: 'paymentMethod',
      headerName: 'Thanh toán',
      cellRenderer: p => {
        if (p.data.isPreorder) {
          return (
            <Text color='purple.400' fontWeight={600}>
              Đặt trước
            </Text>
          );
        }
        return (
          <Text
            color={p.value === 'COD' ? 'green.400' : 'blue.400'}
            fontWeight={600}
          >
            {p.value}
          </Text>
        );
      },
    },
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
    <Box className='ag-theme-yumilk' boxSize='full'>
      <AgGridReact
        defaultColDef={{
          filter: true,
        }}
        rowData={data.items}
        columnDefs={colDefs}
        pagination
        paginationPageSize={25}
        paginationPageSizeSelector={[25, 50, 75, 100]}
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </Box>
  );
};

export default OrderTable;
