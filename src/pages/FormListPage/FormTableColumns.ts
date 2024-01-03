import IForm from '@/interfaces/Form';

interface IColumn {
    disablePadding: boolean;
    id: keyof IForm;
    label: string;
    numeric: boolean;
}

const formTableColumns: IColumn[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'author',
        numeric: false,
        disablePadding: true,
        label: 'Author',
    },
    {
        id: 'createTime',
        numeric: false,
        disablePadding: false,
        label: 'Time Created',
    },
    {
        id: 'numberOfResponse',
        numeric: true,
        disablePadding: true,
        label: 'Responses',
    },
];
export { formTableColumns };
export type { IColumn };
