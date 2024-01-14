import { IFectchedForm } from '@/interfaces/CreateResponse';

interface IColumn {
    id: keyof IFectchedForm;
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
        id: 'createdBy',
        numeric: false,
        label: 'Author',
    },
    {
        id: 'createTime',
        numeric: false,
        label: 'Time Created',
    },
    {
        id: 'responses',
        numeric: true,
        label: 'Responses',
    },
];
export { formTableColumns };
export type { IColumn };
