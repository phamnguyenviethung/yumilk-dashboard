import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { useState } from 'react';
import { Tag } from '@chakra-ui/react';
import CategoryModal from './CategoryModal';

const CategoryTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      filter: true,
    },
    {
      field: 'isActive',
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
      cellRenderer: props => <CategoryModal id={props.value} />,
    },
  ]);
  return (
    <div className='ag-theme-yumilk' style={{ height: '95%' }}>
      <AgGridReact
        rowData={data.items}
        columnDefs={colDefs}
        pagination
        paginationAutoPageSize
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </div>
  );
};

export default CategoryTable;
