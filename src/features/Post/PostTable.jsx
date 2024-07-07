import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Link as RouterLink } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';
import { useDeletePostMutation } from '@/apis/postApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
dayjs.locale('vi');
dayjs.extend(utc);

const PostTable = ({ data }) => {
    const [deletePost] = useDeletePostMutation();
    const toast = useToast();

    const handleDelete = async (id) => {
        try {
            await deletePost(id).unwrap();
            toast({
                title: 'Post deleted.',
                description: "The post has been successfully deleted.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            refreshData();
        } catch (error) {
            toast({
                title: 'Error deleting post.',
                description: error.data?.message || "There was an error deleting the post.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const [colDefs] = useState([
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: 'title',
            headerName: 'Title',
            cellRenderer: params => (
                <RouterLink to={`/post/${params.value}`}>
                    {params.value}
                </RouterLink>
            ),
        },
        { field: 'content', headerName: 'Content' },
        { field: 'authorName', headerName: 'Author' },
        {
            field: 'isActive',
            headerName: 'Active',
            cellRenderer: params => (params.value ? 'Yes' : 'No'),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            cellRenderer: params => dayjs.utc(params.value).local().format('DD/MM/YYYY HH:mm')
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            cellRenderer: params => params.value ? dayjs.utc(params.value).local().format('DD/MM/YYYY HH:mm') : 'N/A'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            cellRenderer: params => (
                <div>
                    <RouterLink to={`/manage/post/${params.data.id}`}>
                        <Button size="sm" colorScheme="blue" mr={2}>Xem chi tiết</Button>
                    </RouterLink>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(params.data.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ]);

    return (
        <div className='ag-theme-quartz' style={{ height: 500 }}>
            <AgGridReact rowData={data.items} columnDefs={colDefs} />
        </div>
    );
};

export default PostTable;