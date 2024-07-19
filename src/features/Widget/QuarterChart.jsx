import { useGetReturnCustomerStatQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import { Center } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';

const QuarterChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetReturnCustomerStatQuery();
  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  const options = {
    container: document.getElementById('s'),
    theme: {
      baseTheme: 'ag-material-dark',
      palette: {
        fills: [theme.colors.orange[400]],
        strokes: ['gray'],
      },
    },
    data: data ?? [],
    background: {
      fill: theme.colors.brand.secondary,
    },
    title: {
      text: 'Khách hàng quay lại mua hàng',
      color: 'white',
    },
    legend: {
      item: {
        label: {
          fontSize: 14,
          color: 'white',
          formatter: props => {
            return props.value;
          },
        },
      },
    },

    series: [
      {
        type: 'bar',
        direction: 'horizontal',
        xKey: 'quarter',
        yKey: 'distinctCustomerCount',
        yName: 'Lượt khách quay lại mua',
        label: {
          color: 'white',
          fontWeight: 700,
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};
export default QuarterChart;
