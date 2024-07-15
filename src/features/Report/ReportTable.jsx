import { Box, Text } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // ES 2015
import { useState } from 'react';
import { Link } from 'react-router-dom';
dayjs.locale('vi');
dayjs.extend(utc);

const ReportTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'productName',
      filter: true,
      headerName: 'Tên sản phẩm',
      cellRenderer: props => {
        return (
          <Text
            as={Link}
            to={`/manage/product/${props.data.productId}`}
            fontWeight={600}
            color={'purple.400'}
          >
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'reportTypeName',
      filter: true,
      headerName: 'Nội dung',
      cellRenderer: props => {
        return (
          <Text fontWeight={600} color={'red.400'}>
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'customerId',
      filter: true,
      headerName: 'Khách hàng',
      cellRenderer: props => {
        return (
          <Text
            as={Link}
            to={`/manage/customer/${props.value}`}
            fontWeight={600}
            color={'purple.400'}
          >
            Xem thông tin khách hàng
          </Text>
        );
      },
    },

    {
      field: 'Thời gian',
      filter: true,
      headerName: 'Trạng thái',
      cellRenderer: props => {
        return (
          <Text mt={2}>{dayjs(props.value).format('DD/MM/YYYY HH:mm')}</Text>
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
        paginationAutoPageSize
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </Box>
  );
};

export default ReportTable;
