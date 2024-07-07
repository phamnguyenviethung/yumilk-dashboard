import { useTheme } from '@emotion/react';
import { AgCharts } from 'ag-charts-react';
import { useState } from 'react';

const PaymentPieChart = () => {
  const theme = useTheme();
  const [options] = useState({
    data: [
      { name: 'COD', percent: 60 },
      { name: 'Ngân hàng', percent: 40 },
    ],
    title: {
      text: 'Tỷ lệ dùng các phương thức thanh toán',
      color: 'white',
    },
    background: {
      fill: theme.colors.brand.secondary,
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
          color: 'white',
          fontWeight: 'bold',
          formatter: ({ value }) => `${value}%`,
        },
      },
    ],
  });

  return <AgCharts options={options} />;
};
export default PaymentPieChart;
