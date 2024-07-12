import { useGetOrderStatsByDateQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import { Center, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';
function formatNumber(value) {
  return `${value}`;
}

const WeeklyChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrderStatsByDateQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  const options = {
    container: document.getElementById('myChart'),
    theme: {
      palette: {
        fills: ['#21B372'],
        strokes: ['gray'],
      },
    },
    data: data?.orderPerDayOfWeek ?? [],
    background: {
      fill: theme.colors.brand.secondary,
    },
    title: {
      text: 'Lượt mua sản phẩm theo các ngày trong tuần',
      color: 'white',
    },
    // legend: {
    //   item: {
    //     label: {
    //       fontSize: 14,
    //       color: 'white',
    //       maxLength: 12,
    //       formatter: props => {
    //         return props.value;
    //       },
    //     },
    //   },
    // },
    series: [
      {
        type: 'bar',
        xKey: 'dateTime',
        yKey: 'count',
        label: {
          formatter: ({ value }) => formatNumber(value),
          color: 'white',
        },
        tooltip: {
          renderer: ({ datum, xKey, yKey }) => {
            return { title: datum[xKey], content: formatNumber(datum[yKey]) };
          },
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Các ngày trong tuần',
          color: 'white',
        },
        label: {
          color: 'white',
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Lượt mua',
          color: 'white',
        },
        label: {
          formatter: ({ value }) => formatNumber(value),
          color: 'white',
        },
        crosshair: {
          label: {
            renderer: ({ value }) => <Text color='white'>{value}</Text>,
            color: 'white',
          },
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};
export default WeeklyChart;
