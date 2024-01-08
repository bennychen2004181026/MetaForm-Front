import IList from '@/interfaces/List';

interface IColumn {
    disablePadding: boolean;
    id: keyof IList;
    label: string;
    numeric: boolean;
}

const memberTableColumns: IColumn[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
];

export { memberTableColumns };
export type { IColumn };
