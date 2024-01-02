import React from 'react';

import FormCards from './components/FormsCards/components/FormCards';
import GlobalStyle from '@/styles/GlobalStyle';

// const rows: IForm[] = [
//     {
//         id: '1',
//         title: 'Metaform Test Questionnaire',
//         author: 'Dylan',
//         createTime: '2023',
//         numberOfResponse: '12',
//     },
//     {
//         id: '2',
//         title: 'Metaform Test Questionnaire 2',
//         author: 'Benny',
//         createTime: '2060',
//         numberOfResponse: '132030',
//     },
// ];

const FormList = () => {
    return (
        <div>
            <GlobalStyle />
            <FormCards />
        </div>
    );
};

export default FormList;
