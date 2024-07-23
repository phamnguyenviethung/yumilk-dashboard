import {
  Box,
  Button,
  HStack,
  Icon,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // ES 2015
import { useState } from 'react';
import VoucherModal from './VoucherModal';
import DeleteDialog from '@/components/DeleteDialog';
import { useDeleteVoucherMutation } from '@/apis/voucherApi';
import { useNavigate } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
dayjs.locale('vi');
dayjs.extend(utc);

const VoucherTable = ({ data }) => {
  const toast = useToast();
  const [deleteVoucherAPI, { isLoading }] = useDeleteVoucherMutation();
  const navigate = useNavigate();

  const [colDefs] = useState([
    {
      field: 'code',
      filter: true,
      headerName: 'Mã',
    },
    {
      field: 'quantity',
      filter: true,
      headerName: 'Lượt sử dụng còn lại',
      cellRenderer: props => {
        return (
          <Text
            fontWeight={600}
            color={
              props.value <= 200
                ? 'red.400'
                : props.value >= 1000
                ? 'green.400'
                : 'yellow.400'
            }
          >
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'percent',
      filter: true,
      headerName: 'Giá trị',
      cellRenderer: props => {
        return (
          <Text
            fontWeight={600}
            color={
              props.value <= 10
                ? 'blue.300'
                : props.value >= 20
                ? 'orange.400'
                : 'purple.400'
            }
          >
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'isAvailable',
      headerName: 'Đủ điều kiện sử dụng',
      filter: true,
      cellRenderer: props => {
        return (
          <Tag
            mt={2}
            colorScheme={props.value ? 'green' : 'red'}
            variant='outline'
          >
            {props.value ? 'Có' : 'Không'}
          </Tag>
        );
      },
    },
    {
      field: 'isActive',
      filter: true,
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
          <VoucherModal id={props.value} />
          <DeleteDialog
            handleDelete={async () => {
              try {
                const res = await deleteVoucherAPI(props.value);
                if (res.error) throw res.error.data;
                toast({
                  title: 'Xoá thành công',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                  position: 'top-right',
                  onCloseComplete: () => {
                    navigate('/manage/voucher');
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
    <Box className='ag-theme-yumilk' boxSize='full'>
      <AgGridReact
        defaultColDef={{
          filter: true,
        }}
        rowData={data.items}
        columnDefs={colDefs}
        pagination
        paginationAutoPageSize
        autoSizeStrategy={{
          type: 'fitGridWidth',
        }}
      />
    </Box>
  );
};

export default VoucherTable;
