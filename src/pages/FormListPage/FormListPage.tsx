import React from 'react';

import IForm from '@/interfaces/Form.interface';
import Header from '@/layouts/Header';
import Table from '@/pages/FormListPage/components/Table';
import { formTableColumns } from '@/pages/FormListPage/FormTableColumns';

const rows: IForm[] = [
    {
        id: '1',
        title: 'Metaform Test Questionnaire',
        author: 'Dylan',
        createTime: '2023',
        numberOfResponse: '12',
    },
    {
        id: '2',
        title: 'Metaform Test Questionnaire 2',
        author: 'Benny',
        createTime: '2060',
        numberOfResponse: '132030',
    },
];

const FormList = () => {
    return (
        <div>
            <Header />
            <Table columns={formTableColumns} rows={rows} />
        </div>
    );
};

export default FormList;
