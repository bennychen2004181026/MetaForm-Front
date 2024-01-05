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
        id: 'lastActive',
        numeric: false,
        disablePadding: false,
        label: 'Last Active',
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
