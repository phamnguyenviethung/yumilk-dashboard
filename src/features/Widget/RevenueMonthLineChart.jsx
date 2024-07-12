import { useGetRevenueStatsByMonthQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import { Center } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';

const RevenueMonthLineChart = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetRevenueStatsByMonthQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  const options = {
    container: document.getElementById('orderPerDay'),
    data: data ?? [],
    background: {
      fill: theme.colors.brand.secondary,
    },
    title: {
      text: 'Các lượt mua hàng',
      color: 'white',
    },

    series: [
      {
        type: 'line',
        xKey: 'month',
        yKey: 'revenue',
        color: 'white',
        label: {
          color: 'white',
        },
      },
    ],

    axes: [
      {
        position: 'bottom',
        type: 'category',

        label: {
          format: '%b',
          color: 'white',
        },
      },
      {
        position: 'left',
        type: 'number',
        title: {
          text: 'Số lượng đơn',
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};
export default RevenueMonthLineChart;
