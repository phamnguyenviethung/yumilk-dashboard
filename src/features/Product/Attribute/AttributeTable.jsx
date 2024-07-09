import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import '@/assets/table.css';
import { useState } from 'react';

const AttributeTable = ({ data }) => {
  const [colDefs] = useState([
    { field: 'id' },
    { field: 'name', filter: true },
    { field: 'description' },
    { field: 'isActive' },
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
