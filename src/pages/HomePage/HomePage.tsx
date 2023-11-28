import React from 'react';

import Table from '@/components/Table';
import IColumn from '@/components/Table/interfaces/IColumn';
import Header from '@/layouts/Header';

const columns: IColumn[] = [
    { id: 'title', label: 'Title', minWidth: 250 },
    { id: 'author', label: 'Author', minWidth: 50 },
    {
        id: 'createdTime',
        label: 'createdTime',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'numberOfResponse',
        label: 'Responses',
        minWidth: 170,
        align: 'right',
    },
];
interface IForm {
    title: string;
    author: string;
    createdTime: string;
    numberOfResponse: string;
}
const rows: Record<string, string>[] = [
    {
        title: 'Metaform Test Questionnaire',
        author: 'Dylan',
        createdTime: '2023',
        numberOfResponse: '12',
    },
    {
        title: 'Metaform Test Questionnaire 2',
        author: 'Benny',
        createdTime: '2060',
        numberOfResponse: '132030',
    },
];
const HomePage = () => {
    return (
        <div>
            <Header />
            <Table rowsPerPage={1} columns={columns} rows={rows} />
        </div>
    );
};

export default HomePage;
