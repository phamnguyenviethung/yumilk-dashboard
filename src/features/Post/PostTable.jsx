import { useDeletePostMutation } from '@/apis/postApi';
import { Button, Icon, useToast } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { TbEyeEdit, TbTrash } from 'react-icons/tb';
import { Link as RouterLink } from 'react-router-dom';
dayjs.locale('vi');
dayjs.extend(utc);

const PostTable = ({ data }) => {
  const [deletePost] = useDeletePostMutation();
  const toast = useToast();

  const handleDelete = async id => {
    try {
      await deletePost(id).unwrap();
      toast({
        title: 'Xoá thành công',
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Xoá thất bại',
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const [colDefs] = useState([
    { field: 'id', headerName: 'ID' },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      cellRenderer: params => (
        <RouterLink to={`/post/${params.value}`}>{params.value}</RouterLink>
      ),
    },
    { field: 'authorName', headerName: 'Tác giả' },

    {
      field: 'updatedAt',
      headerName: 'Cập nhật lần cuối',
      cellRenderer: params =>
        params.value
          ? dayjs.utc(params.value).local().format('DD/MM/YYYY HH:mm')
          : 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      cellRenderer: params => (
        <div>
          <RouterLink to={`/manage/post/${params.data.id}`}>
            <Button variant='ghost' colorScheme='pink' mr={2}>
              <Icon as={TbEyeEdit} fontSize='1.4rem' />
            </Button>
          </RouterLink>
          <Button
            variant='ghost'
            colorScheme='red'
            onClick={() => handleDelete(params.data.id)}
          >
            <Icon as={TbTrash} fontSize='1.4rem' />
          </Button>
        </div>
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

export default PostTable;
