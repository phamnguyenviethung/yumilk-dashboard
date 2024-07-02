import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';
import formatMoney from '@/utils/formatMoney';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const ProductTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
      headerName: 'ID',
      valueFormatter: p => '...' + p.value.slice(-5),
    },
    {
      field: 'name',
      headerName: 'Tên',
      filter: true,
    },

    {
      field: 'quantity',
      headerName: 'Tồn kho',
    },
    {
      field: 'originalPrice',
      headerName: 'Giá gốc',
      valueFormatter: p => formatMoney(p.value),
    },
    {
      field: 'salePrice',
      headerName: 'Giá khuyến mãi',
      valueFormatter: p => (p.value === 0 ? 'Không có' : formatMoney(p.value)),
    },
    { field: 'status', headerName: 'Trạng thái' },
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
    <div className='ag-theme-quartz-auto-dark' style={{ height: 500 }}>
      <AgGridReact rowData={data.items} columnDefs={colDefs} />
    </div>
  );
};

export default ProductTable;
