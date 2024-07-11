import { Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';
import { useState } from 'react';
function formatNumber(value) {
  return `${value}`;
}

const WeeklyChart = () => {
  const theme = useTheme();

  const [options] = useState({
    container: document.getElementById('myChart'),
    theme: {
      palette: {
        fills: ['#21B372'],
        strokes: ['gray'],
      },
    },
    data: [
      { year: 'Thứ 2', visitors: 200 },
      { year: 'Thứ 3', visitors: 215 },
      { year: 'Thứ 4', visitors: 111 },
      { year: 'Thứ 5', visitors: 21 },
      { year: 'Thứ 6', visitors: 55 },
      { year: 'Thứ 7', visitors: 102 },
      { year: 'Chủ Nhật', visitors: 109 },
    ],
    background: {
      fill: theme.colors.brand.secondary,
    },
    title: {
      text: 'Lượt mua sản phẩm theo các ngày trong tuần',
      color: 'white',
    },
    legend: {
      item: {
        label: {
          fontSize: 14,
          color: 'white',
          maxLength: 12,
          formatter: props => {
            console.log(props);
            return props.value;
          },
        },
      },
    },
    series: [
      {
        type: 'bar',
        xKey: 'year',
        yKey: 'visitors',
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
          text: 'Ngày trong tuần',
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
  });

  return <AgCharts options={options} />;
};
export default WeeklyChart;
