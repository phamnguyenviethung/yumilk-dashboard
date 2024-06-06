import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';

const ProductTable = ({ data }) => {
  const [colDefs] = useState([
    { field: 'id' },
    { field: 'name', filter: true },

    { field: 'quantity', rowSpan: () => 'hello' },
    { field: 'originalPrice' },
    { field: 'salePrice' },
    { field: 'status' },
  ]);
  return (
    <div
      className='ag-theme-quartz-auto-dark' // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact rowData={data.items} columnDefs={colDefs} />
    </div>
  );
};

export default ProductTable;
