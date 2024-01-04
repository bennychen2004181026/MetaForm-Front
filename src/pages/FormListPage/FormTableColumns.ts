import IForm from '@/interfaces/Form';

interface IColumn {
    id: keyof IForm;
    label: string;
    numeric: boolean;
}

const formTableColumns: IColumn[] = [
    {
        id: 'title',
        numeric: false,
        label: 'Title',
    },
    {
        id: 'author',
        numeric: false,
        label: 'Author',
    },
    {
        id: 'createTime',
        numeric: false,
        label: 'Time Created',
    },
    {
        id: 'numberOfResponses',
        numeric: true,
        label: 'Responses',
    },
];
export { formTableColumns };
export type { IColumn };
