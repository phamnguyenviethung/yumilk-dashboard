import CONSTANST from '@/constants';
import { Button, Tag } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'userID',
      headerName: 'ID',
    },
    {
      field: 'firstName',
      headerName: 'Họ',
    },
    {
      field: 'lastName',
      headerName: 'Tên',
    },
    {
      field: 'username',
      headerName: 'Tên người dùng',
    },
    {
      field: 'email',
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      cellRenderer: props => {
        return (
          <Tag
            mt={2}
            colorScheme={
              props.value.toLowerCase() === CONSTANST.ROLE_ADMIN
                ? 'pink'
                : 'purple'
            }
          >
            {props.value}
          </Tag>
        );
      },
    },
    {
      field: 'isBanned',
      headerName: 'Trạng thái',
      cellRenderer: props => {
        return (
          <Tag mt={2} colorScheme={!props.value ? 'green' : 'red'}>
            {!props.value ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        );
      },
    },
    {
      field: 'userID',
      headerName: 'ID',
      cellRenderer: props => {
        return (
          <Button
            as={Link}
            to={`/manage/customer/${props.value}`}
            variant='ghost'
            colorScheme='pink'
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ]);
  return (
    <div className='ag-theme-yumilk' style={{ height: '95%' }}>
      <AgGridReact
        rowData={data.items}
        columnDefs={colDefs}
        defaultColDef={{
          filter: true,
        }}
        pagination
        paginationAutoPageSize
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </div>
  );
};

export default CustomerTable;
