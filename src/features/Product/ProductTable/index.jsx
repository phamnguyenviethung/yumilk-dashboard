import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
// import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import { Link as ChakraLink, Tag, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PRODUCT_STATUS } from '@/constants/product';
const ProductTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
      filter: true,
    },

    {
      field: 'quantity',
      headerName: 'Tồn kho',
      filter: 'agNumberColumnFilter',
      cellRenderer: p => (
        <Text
          color={
            p.value === 0
              ? 'red.400'
              : p.value <= 10
              ? 'yellow.400'
              : 'green.400'
          }
          fontWeight={600}
        >
          {p.value}
        </Text>
      ),
    },
    {
      field: 'originalPrice',
      headerName: 'Giá gốc',
      filter: 'agNumberColumnFilter',

      valueFormatter: p => formatMoney(p.value),
    },
    {
      field: 'salePrice',
      headerName: 'Giá khuyến mãi',
      filter: 'agNumberColumnFilter',
      cellRenderer: p => (
        <Text
          color={p.value !== 0 ? 'pink.300' : 'gray.400'}
          fontWeight={p.value !== 0 ? '600' : '500'}
          fontSize={p.value !== 0 ? '1rem' : 'inherit'}
        >
          {p.value === 0 ? 'N/A' : formatMoney(p.value)}
        </Text>
      ),
    },
    {
      field: 'statusId',
      headerName: 'Trạng thái',
      cellRenderer: props => {
        const info = PRODUCT_STATUS.find(p => p.id === props.value);
        return (
          <Tag mt={2} size='md' variant='solid' colorScheme={info.tagColor}>
            {info.name}
          </Tag>
        );
      },
    },
    {
      field: 'isActive',
      headerName: 'Công khai',
      cellRenderer: props => {
        return (
          <Tag mt={2} size='md' colorScheme={props.value ? 'blue' : 'purple'}>
            {props.value ? 'Công khai' : 'Không công khai'}
          </Tag>
        );
      },
    },
    {
      field: 'id',
      headerName: 'Chi tiết',

      cellRenderer: props => {
        return (
          <ChakraLink
            color='pink.400'
            as={Link}
            to={`/manage/product/${props.value}`}
          >
            Xem chi tiết
          </ChakraLink>
        );
      },
    },
  ]);
  return (
    <div className='ag-theme-yumilk' style={{ height: '95%' }}>
      <AgGridReact
        rowData={data.items}
        columnDefs={colDefs}
        pagination
        paginationAutoPageSize
        floatingFilter
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </div>
  );
};

export default ProductTable;
