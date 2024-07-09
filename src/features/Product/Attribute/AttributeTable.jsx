import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import '@/assets/table.css';
import { useState } from 'react';
import { Tag } from '@chakra-ui/react';
import AttributeModal from './AttributeModal';

const AttributeTable = ({ data }) => {
  const [colDefs] = useState([
    { field: 'id', headerName: 'ID' },
    { field: 'name', filter: true },
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
      cellRenderer: props => <AttributeModal id={props.value} />,
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

export default AttributeTable;
