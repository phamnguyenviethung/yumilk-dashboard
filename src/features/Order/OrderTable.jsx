import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderTable = ({ data }) => {
  const [colDefs] = useState([
    { field: 'id' },
    { field: 'createdDate', filter: true },
    { field: 'totalAmount' },
    { field: 'paymentMethod' },
    { field: 'orderStatus' },
    {
      field: 'id',
      cellRenderer: props => {
        return <Link to={`/manage/order/${props.value}`}>Xem chi tiết</Link>;
      },
    },
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

export default OrderTable;
