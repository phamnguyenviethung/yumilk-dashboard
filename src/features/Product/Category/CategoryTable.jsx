import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { useState } from 'react';
import { Button, HStack, Icon, Tag, Text, useToast } from '@chakra-ui/react';
import CategoryModal from './CategoryModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteCategoryMutation } from '@/apis/productApi';
import DeleteDialog from '@/components/DeleteDialog';
import { TbTrash } from 'react-icons/tb';

const CategoryTable = ({ data }) => {
  const toast = useToast();
  const [deleteCategoryAPI, { isLoading }] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  const [colDefs] = useState([
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      filter: true,
    },
    {
      field: 'parentName',
      headerName: 'Danh mục cha',
      filter: true,
      cellRenderer: props => {
        if (!props.value) return <Text color='gray.400'>N/A</Text>;

        return (
          <Tag mt={2} colorScheme='teal'>
            {props.value}
          </Tag>
        );
      },
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
      cellRenderer: props => (
        <HStack gap='1'>
          <CategoryModal id={props.value} />
          <DeleteDialog
            handleDelete={async () => {
              try {
                const res = await deleteCategoryAPI(props.value);
                if (res.error) throw res.error.data;
                toast({
                  title: 'Xoá thành công',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                  position: 'top-right',
                  onCloseComplete: () => {
                    navigate('/manage/category');
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

export default CategoryTable;
