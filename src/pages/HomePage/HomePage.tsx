import React from 'react';

import Table from '@/components/Table';
import IColumn from '@/components/Table/interfaces/IColumn';
import Header from '@/layouts/Header';

const columns: IColumn[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: string;
    size: string;
}

function createData(
    name: string,
    code: string,
    population: string,
    size: string,
): Record<string, string> {
    return { name, code, population, size };
}

const rows = [
    createData('India', 'IN', '1324171354', '3287263'),
    createData('China', 'CN', '1403500365', '9596961'),
    createData('Italy', 'IT', '60483973', '301340'),
];
const HomePage = () => {
    return (
        <div>
            <Header />
            <Table rowsPerPage={10} columns={columns} rows={rows} />
        </div>
    );
};

export default HomePage;
