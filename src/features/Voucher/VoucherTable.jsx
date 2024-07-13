import { Box, Tag, Text } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // ES 2015
import { useState } from 'react';
import VoucherModal from './VoucherModal';
dayjs.locale('vi');
dayjs.extend(utc);

const VoucherTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'code',
      filter: true,
      headerName: 'Mã',
    },
    {
      field: 'quantity',
      filter: true,
      headerName: 'Lượt sử dụng còn lại',
      cellRenderer: props => {
        return (
          <Text
            fontWeight={600}
            color={
              props.value <= 200
                ? 'red.400'
                : props.value >= 1000
                ? 'green.400'
                : 'yellow.400'
            }
          >
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'percent',
      filter: true,
      headerName: 'Giá trị',
      cellRenderer: props => {
        return (
          <Text
            fontWeight={600}
            color={
              props.value <= 10
                ? 'blue.300'
                : props.value >= 20
                ? 'orange.400'
                : 'purple.400'
            }
          >
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'isAvailable',
      headerName: 'Đủ điều kiện sử dụng',
      filter: true,
      cellRenderer: props => {
        return (
          <Tag
            mt={2}
            colorScheme={props.value ? 'green' : 'red'}
            variant='outline'
          >
            {props.value ? 'Có' : 'Không'}
          </Tag>
        );
      },
    },
    {
      field: 'isActive',
      filter: true,
      headerName: 'Trạng thái',
      cellRenderer: props => {
        return (
          <Tag mt={2} colorScheme={props.value ? 'green' : 'red'}>
            {props.value ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        );
      },
    },

    {
      field: 'id',
      headerName: 'Chi tiết',
      cellRenderer: props => <VoucherModal id={props.value} />,
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

export default VoucherTable;
