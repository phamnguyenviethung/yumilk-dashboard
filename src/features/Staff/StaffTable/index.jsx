import { useUpdateUserMutation } from '@/apis/userApi';
import CONSTANST from '@/constants';
import { Switch, Tag } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState } from 'react';

const StaffStatus = ({ id, isBanned }) => {
  const [updateStaffStatusAPI, { isLoading }] = useUpdateUserMutation();

  return (
    <Switch
      colorScheme='pink'
      isChecked={isBanned}
      isDisabled={isLoading}
      onChange={async () => {
        try {
          const res = await updateStaffStatusAPI({
            id,
            data: {
              isBanned: !isBanned,
            },
          });
          if (res.error) throw res.error.data;
        } catch (err) {
          console.log(err);
        }
      }}
    />
  );
};

const StaffTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'id',
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
      field: 'isBanned',
      headerName: 'Khoá tài khoản',
      cellRenderer: props => {
        return <StaffStatus id={props.data.id} isBanned={props.value} />;
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

export default StaffTable;
