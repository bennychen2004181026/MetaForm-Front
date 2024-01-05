import React from 'react';

import IList from '@/interfaces/List';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import Table from '@/pages/CompanyMembersPage/Table';

const rows: IList[] = [
    {
        id: '1',
        name: 'Oliver Wang',
        email: 'oliver.wang@gmail.com',
        lastActive: 'Jan 01, 2023',
        role: 'admin',
    },
    {
        id: '2',
        name: 'Dylan Wang',
        email: 'dylan.wang@gmail.com',
        lastActive: 'Jan 01, 2024',
        role: 'viewer',
    },
    {
        id: '3',
        name: 'Benny Wang',
        email: 'benny.wang@gmail.com',
        lastActive: 'Feb 02, 2022',
        role: 'editor',
    },
    {
        id: '4',
        name: 'Emma Wang',
        email: 'emma.wang@gmail.com',
        lastActive: 'Mar 20, 2023',
        role: 'viewer',
    },
    {
        id: '5',
        name: 'Yifan Wang',
        email: 'yifan.wang@gmail.com',
        lastActive: 'Apr 03, 2022',
        role: 'admin',
    },
    {
        id: '6',
        name: 'Ellery Wang',
        email: 'ellery.wang@gmail.com',
        lastActive: 'May 15, 2023',
        role: 'admin',
    },
    {
        id: '7',
        name: 'Chris Wang',
        email: 'chris.wang@gmail.com',
        lastActive: 'Jun 26, 2022',
        role: 'viewer',
    },
    {
        id: '8',
        name: 'Aaron Wang',
        email: 'aaron.wang@gmail.com',
        lastActive: 'Jul 28, 2023',
        role: 'editor',
    },
];

const CompanyMembersPage: React.FC = () => {
    return (
        <div>
            <Header />
            <MainLayout>
                <Table rows={rows} />
            </MainLayout>
        </div>
    );
};

export default CompanyMembersPage;
