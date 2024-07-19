import { useGetPaymentStatsQuery } from '@/apis/statApi';
import CircleLoading from '@/components/Loading/CircleLoading';
import { Center } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';
import numeral from 'numeral';

const PaymentPieChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetPaymentStatsQuery();

  if (isLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  const options = {
    theme: {
      baseTheme: 'ag-material-dark',
      palette: {
        fills: [theme.colors.purple[400], theme.colors.pink[400]],
        strokes: ['gray'],
      },
    },
    data: [
      { name: 'COD', percent: data?.percentCod },
      { name: 'Ngân hàng', percent: data?.percentPayOs },
    ],
    title: {
      text: 'Tỷ lệ sử dụng các phương thức thanh toán',
      color: 'white',
      fontSize: 14,
    },
    background: {
      fill: theme.colors.brand.secondary,
    },
    legend: {
      item: {
        label: {
          fontSize: 12,
          color: 'white',
          maxLength: 12,
        },
      },
    },
    series: [
      {
        type: 'pie',
        angleKey: 'percent',
        calloutLabelKey: 'name',
        sectorLabelKey: 'percent',
        calloutLabel: {
          color: 'white',
        },
        sectorLabel: {
          fontSize: 12,
          color: 'white',
          fontWeight: 'bold',
          formatter: ({ value }) => `${numeral(value).format('0,0')}%`,
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};
export default PaymentPieChart;
