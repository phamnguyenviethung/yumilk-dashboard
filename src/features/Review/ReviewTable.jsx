import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // ES 2015
import { useState } from 'react';
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

dayjs.locale('vi');
dayjs.extend(utc);

const Stars = ({ rate }) => {
  return (
    <HStack>
      {[1, 2, 3, 4, 5].map(n => (
        <Icon
          key={n}
          as={n > rate ? HiOutlineStar : HiStar}
          color='yellow.200'
          fontSize='1.5rem'
        />
      ))}
    </HStack>
  );
};

const ReviewTable = ({ data }) => {
  const [colDefs] = useState([
    {
      field: 'productName',
      filter: true,
      headerName: 'Tên sản phẩm',
      cellRenderer: props => {
        return (
          <Text as={Link} to={`/manage/product/${props.data.productId}`}>
            {props.value}
          </Text>
        );
      },
    },
    {
      field: 'rating',
      filter: true,
      headerName: 'Đánh giá',
      cellRenderer: props => {
        return <Stars rate={props.value} />;
      },
    },
    {
      field: 'review',
      filter: true,
      headerName: 'Bình luận',
    },
    {
      field: 'createdAt',
      filter: true,
      headerName: 'Thời gian',
      cellRenderer: props => {
        return <Text>{dayjs(props.value).format('DD/MM/YYYY HH:mm')}</Text>;
      },
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

export default ReviewTable;
