import { useGetRevenueStatsByMonthQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import { Center } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';
import numeral from 'numeral';
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
    theme: {
      palette: {
        fills: ['#B794F4'],
        strokes: ['gray'],
      },
    },
    data: data ?? [],
    background: {
      fill: theme.colors.brand.secondary,
    },
    title: {
      text: 'Doanh thu',
      color: 'white',
    },

    series: [
      {
        type: 'line',
        xKey: 'month',
        yKey: 'revenue',
        label: {
          color: 'white',
          formatter: ({ value }) => numeral(value).format('-0a'),
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
          text: 'Doanh thu',
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};
export default RevenueMonthLineChart;
