import { IForm } from '@/interfaces/CreateForm';

const dummyFormsData: IForm[] = [
    {
        formId: '1',
        title: 'Test Form by Monash university Web development',
        numberOfResponses: 12,
        createTime: '2021-03-25',
        expire: '2022-03-25',
        createdBy: 'Yansong',
        validFrom: '2022-02-25',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '0',
                questionId: '1',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '0',
                questionId: '2',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
    {
        formId: '2',
        title: 'Test Form by Monash university Yansong',
        numberOfResponses: 1,
        createTime: '2021-03-25',
        expire: '2022-03-25',
        createdBy: 'Yansong',
        validFrom: '2022-02-25',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '0',
                questionId: '1',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '0',
                questionId: '2',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
    {
        formId: '1',
        title: 'Test Form by Monash university Machine Learning',
        numberOfResponses: 34,
        createTime: '2021-03-25',
        expire: '2022-03-25',
        createdBy: 'Yansong',
        validFrom: '2022-02-25',
        description:
            'This form is designed to conduct a survey on the employment of IT graduate in 2023',
        questions: [
            {
                questionType: '3',
                questionId: '1',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
            {
                questionType: '0',
                questionId: '2',
                required: true,
                title: { content: 'Your age' },
                options: [{ id: '1', value: 'Option 1' }],
                other: false,
            },
        ],
    },
];
export default dummyFormsData;
