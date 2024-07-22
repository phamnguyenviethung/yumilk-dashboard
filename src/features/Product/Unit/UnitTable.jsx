import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { useState } from 'react';
import { Button, HStack, Icon, Tag, useToast } from '@chakra-ui/react';
import AttributeModal from './UnitModal';
import DeleteDialog from '@/components/DeleteDialog';
import { useNavigate } from 'react-router-dom';
import { useDeleteUnitMutation } from '@/apis/productApi';
import { TbTrash } from 'react-icons/tb';

const UnitTable = ({ data }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [deleteUnitAPI, { isLoading }] = useDeleteUnitMutation();

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
      cellRenderer: props => (
        <HStack gap='1'>
          {' '}
          <AttributeModal id={props.value} />
          <DeleteDialog
            handleDelete={async () => {
              try {
                const res = await deleteUnitAPI(props.value);
                if (res.error) throw res.error.data;
                toast({
                  title: 'Xoá thành công',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                  position: 'top-right',
                  onCloseComplete: () => {
                    navigate('/manage/unit');
                  },
                });
              } catch (error) {
                toast({
                  title: error?.message ?? 'Thất bại',
                  status: 'error',
                  duration: 2500,
                  isClosable: true,
                  position: 'top-right',
                });
              }
            }}
            isLoading={isLoading}
          >
            <Button
              variant='ghost'
              colorScheme='pink'
              size='sm'
              isLoading={isLoading}
            >
              <Icon as={TbTrash} fontSize='1.5rem' colorScheme='pink.400' />
            </Button>
          </DeleteDialog>
        </HStack>
      ),
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

export default UnitTable;
