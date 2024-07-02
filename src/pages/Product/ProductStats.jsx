import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetOrderStatsQuery, useGetProductStatsQuery } from '@/apis/statApi';
import { format, subDays } from 'date-fns';
import {
    VStack,
    Select,
} from '@chakra-ui/react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductStats = () => {
    const [fromDate, setFromDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectedDataset, setSelectedDataset] = useState('orders');

    const { data: statsData } = useGetOrderStatsQuery({ fromDate, toDate });
    const { data: productStatsData } = useGetProductStatsQuery({ fromDate, toDate });


    const getChartData = () => {
        if (selectedDataset === 'orders') {
            return {
                labels: Object.keys(statsData?.totalOrdersPerStatus || {}),
                datasets: [
                    {
                        label: 'Total Orders by Status',
                        data: Object.values(statsData?.totalOrdersPerStatus || {}),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            };
        } else if (selectedDataset === 'products') {
            const categories = Object.keys(productStatsData?.statsPerCategory || {});
            const totalSoldData = categories.map(category => productStatsData.statsPerCategory[category].totalSold);

            return {
                labels: categories,
                datasets: [
                    {
                        label: 'Total Sold per Category',
                        data: totalSoldData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            };
        } else if (selectedDataset === 'brands') {
            const brands = Object.keys(productStatsData?.statsPerBrand || {});
            const totalSoldByBrand = brands.map(brand => productStatsData.statsPerBrand[brand].totalSold);

            return {
                labels: brands,
                datasets: [
                    {
                        label: 'Total Sold per Brand',
                        data: totalSoldByBrand,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            };
        }
    };

    const barChartData = getChartData();

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
            <div>Product and Order Stats</div>
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
                    <Select value={selectedDataset} onChange={e => setSelectedDataset(e.target.value)}>
                        <option value="orders">Orders</option>
                        <option value="products">Products</option>
                        <option value="brands">Brands</option>
                    </Select>
                </VStack>
            </div>
            <Bar data={barChartData} options={options} />
        </>
    );
};

export default ProductStats;