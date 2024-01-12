import React from 'react';

import { useParams } from 'react-router-dom';

import IList from '@/interfaces/List';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import Table from '@/pages/CompanyMembersPage/Table';

const rows: IList[] = [
    {
        id: '1',
        name: 'Oliver Wang',
        email: 'oliver.wang@gmail.com',
        status: 'Active',
        role: 'employee',
    },
    {
        id: '2',
        name: 'Dylan Wang',
        email: 'dylan.wang@gmail.com',
        status: 'Inactive',
        role: 'N/A',
    },
    {
        id: '3',
        name: 'Benny Wang',
        email: 'benny.wang@gmail.com',
        status: 'Active',
        role: 'admin',
    },
    {
        id: '4',
        name: 'Emma Wang',
        email: 'emma.wang@gmail.com',
        status: 'Active',
        role: 'employee',
    },
    {
        id: '5',
        name: 'Yifan Wang',
        email: 'yifan.wang@gmail.com',
        status: 'Inactive',
        role: 'N/A',
    },
    {
        id: '6',
        name: 'Ellery Wang',
        email: 'ellery.wang@gmail.com',
        status: 'Active',
        role: 'superAdmin',
    },
    {
        id: '7',
        name: 'Chris Wang',
        email: 'chris.wang@gmail.com',
        status: 'Active',
        role: 'employee',
    },
    {
        id: '8',
        name: 'Aaron',
        email: 'aaron.wang@gmail.com',
        status: 'Active',
        role: 'admin',
    },
];

const CompanyMembersPage: React.FC = () => {
    const { userId } = useParams<{ userId?: string }>();
    return (
        <div>
            <Header />
            <MainLayout>
                <Table rows={rows} userId={userId} />
            </MainLayout>
        </div>
    );
};

export default CompanyMembersPage;
