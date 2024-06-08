import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';

const AttributeTable = ({ data }) => {
  const [colDefs] = useState([
    { field: 'id' },
    { field: 'name', filter: true },
    { field: 'description' },
    { field: 'isActive' },
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

export default AttributeTable;
