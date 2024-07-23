import { Button, HStack, Icon, Tag, useToast } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState } from 'react';
import BrandModal from './BrandModal';
import DeleteDialog from '@/components/DeleteDialog';
import { TbTrash } from 'react-icons/tb';
import { useDeleteBrandMutation } from '@/apis/brandApi';
import { useNavigate } from 'react-router-dom';

const BrandTable = ({ data }) => {
  const toast = useToast();
  const [deleteBrandAPI, { isLoading }] = useDeleteBrandMutation();
  const navigate = useNavigate();

  const [colDefs] = useState([
    {
      field: 'name',
      headerName: 'Tên',
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
      headerName: 'Hành động',
      cellRenderer: props => (
        <HStack gap='1'>
          <BrandModal id={props.value} />
          <DeleteDialog
            handleDelete={async () => {
              try {
                const res = await deleteBrandAPI(props.value);
                if (res.error) throw res.error.data;
                toast({
                  title: 'Xoá thành công',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                  position: 'top-right',
                  onCloseComplete: () => {
                    navigate('/manage/brand');
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
              colorScheme='red'
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

export default BrandTable;
