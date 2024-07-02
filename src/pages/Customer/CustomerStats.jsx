import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetCustomerStatsQuery } from '@/apis/statApi';
import { format, subDays } from 'date-fns';
import {
    VStack,
    Select,
} from '@chakra-ui/react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductStats = () => {
    const [fromDate, setFromDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const { data: customerStats } = useGetCustomerStatsQuery({ fromDate, toDate });


    const chartData = {
        labels: ['Total Customers', 'Total Bought Customers'],
        datasets: [
            {
                label: 'Customer Statistics',
                data: [
                    customerStats?.totalCustomers ?? 0,
                    customerStats?.totalBoughtCustomer ?? 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stats Data',
            },
        },
    };

    return (
        <>
            <div>Customer Stats</div>
            <div>
                <VStack>
                    <label>
                        From Date:
                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </label>
                    <label>
                        To Date:
                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                    </label>
                </VStack>
            </div>
            <Bar data={chartData} options={options} />
        </>
    );
};

export default ProductStats;